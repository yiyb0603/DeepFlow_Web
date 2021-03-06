import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import firebase from 'firebase/app';
import '@firebase/messaging';
import { registerLoading, requestRegisterState } from 'lib/recoil/atom/auth';
import firebaseConfig from 'config/firebase.json';
import { TOKEN_KEY } from 'config/config.json';
import AuthError from 'error/AuthError';
import { historySingleton } from 'lib/singleton/history';
import { getGithubInfo, handleRegister } from 'lib/api/auth/auth.api';
import { IGithubCodeDto } from 'lib/api/auth/auth.dto';
import { setFCMToken } from 'lib/api/user/user.api';
import { SetFCMDto } from 'lib/api/user/user.dto';
import Cookie from 'lib/Cookie';
import { EResponse } from 'lib/enum/response';
import Toast from 'lib/Toast';
import { validateSignUp } from 'validation/auth.validation';
import getQueryString from 'util/getQueryString';
import { IGithubResponse, ILoginResponse, IRegisterRequest } from 'types/user.types';

const useRegister = () => {
  const code: string = useMemo(() => getQueryString('code') as string, []);
  
  const [request, setRequest] = useRecoilState<IRegisterRequest>(requestRegisterState);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(registerLoading);

  const onChangeRequest = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    if (name === 'major' || name === 'generation') {
      setRequest((request: IRegisterRequest) => ({
        ...request,
        [name]: Number(value),
      }));
    } else {
      setRequest((request: IRegisterRequest) => ({
        ...request,
        [name]: value,
      })); 
    }
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

          Cookie.setCookie(TOKEN_KEY, accessToken);
          historySingleton.push('/');
          Toast.successToast('????????? ???????????????.');

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
      new AuthError(error).registerError();
    }
  }, [code, requestNotificationAllow, setRequest]);

  const requestRegister = useCallback(async (): Promise<void> => {
    try {
      if (!validateSignUp(request)) {
        return;
      }

      setIsLoading(true);
      const { status, data }: ILoginResponse = await handleRegister(request);

      if (status === EResponse.OK) {
        Cookie.setCookie(TOKEN_KEY, data.accessToken);
        historySingleton.push('/');
        Toast.successToast('??????????????? ?????????????????????.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [request, setIsLoading]);

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