import { ChangeEvent, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import firebase from 'firebase/app';
import '@firebase/messaging';
import { registerLoading, requestRegisterState } from 'atom/auth';
import firebaseConfig from 'config/firebase.json';
import AuthError from 'error/AuthError';
import { getGithubInfo, handleRegister } from 'lib/api/auth/auth.api';
import { IGithubCodeDto } from 'lib/api/auth/auth.dto';
import { setFCMToken } from 'lib/api/user/user.api';
import { SetFCMDto } from 'lib/api/user/user.dto';
import { setCookie } from 'lib/Cookie';
import { EResponse } from 'lib/enum/response';
import { successToast } from 'lib/Toast';
import { IGithubResponse, ILoginResponse, IRegisterRequest } from 'types/user.types';
import { validateSignUp } from 'validation/auth.validation';
import useQueryString from '../util/useQueryString';

const useRegister = () => {
  const { code } = useQueryString();
  const history: History = useHistory();
  
  const [request, setRequest] = useRecoilState<IRegisterRequest>(requestRegisterState);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(registerLoading);

  const onChangeRequest = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setRequest((request: IRegisterRequest) => ({
      ...request,
      [name]: value,
    }));
  }, [setRequest]);

  const getFCMToken = useCallback(async (): Promise<void> => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		const fcmToken: string = await firebase.messaging().getToken();
    const setFcmRequest: SetFCMDto = {
      fcmToken,
    };

		await setFCMToken(setFcmRequest);
	}, []);

	const requestNotificationAllow = useCallback(async (): Promise<void> => {
		await Notification.requestPermission()
    .then((permission: NotificationPermission) => {
			if (permission === 'granted') {
				getFCMToken();
			}});
	}, [getFCMToken]);
  
  const requestLoginOrGithubInfo = useCallback(async (): Promise<void> => {
    try {
      const githubInfo: IGithubCodeDto = {
        code: String(code),
      };

      const { status, data }: IGithubResponse = await getGithubInfo(githubInfo);
      if (status === EResponse.OK) {
        if (data.accessToken !== undefined) {
          const { accessToken } = data;

          setCookie('access_token', accessToken);
          history.push('/');
          successToast('로그인 되었습니다.');

          await requestNotificationAllow();
          return;
        }

        const { githubInfo } = data;
        setRequest((request: IRegisterRequest) => ({
          ...request,
          ...githubInfo,
        }));
      }
    } catch (error) {
      new AuthError(error).registerError(history);
    }
  }, [code, history, requestNotificationAllow, setRequest]);

  const requestRegister = useCallback(async (): Promise<void> => {
    try {
      if (!validateSignUp(request)) {
        return;
      }

      setIsLoading(true);
      const { status, data }: ILoginResponse = await handleRegister(request);

      if (status === EResponse.OK) {
        setCookie('access_token', data.accessToken);
        history.push('/');
        successToast('회원가입을 성공하였습니다.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [history, request, setIsLoading]);

  useEffect(() => {
    requestLoginOrGithubInfo();
  }, [requestLoginOrGithubInfo]);

  return {
    isLoading,
    request,
    onChangeRequest,
    requestRegister,
  };
}; 

export default useRegister;