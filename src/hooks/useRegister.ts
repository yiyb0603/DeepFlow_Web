import { ChangeEvent, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { registerLoading, requestRegisterState } from 'atom/auth';
import AuthError from 'error/AuthError';
import { getGithubInfo, handleRegister } from 'lib/api/auth/auth.api';
import { IGithubCodeDto } from 'lib/api/auth/auth.dto';
import { setCookie } from 'lib/Cookie';
import { EResponse } from 'lib/enum/response';
import { successToast } from 'lib/Toast';
import { IGithubResponse, ILoginResponse, IRegisterRequest } from 'types/user.types';
import { validateSignUp } from 'validation/auth.validation';
import useQueryString from './util/useQueryString';

const useRegister = () => {
  const { code } = useQueryString();
  const history: History<unknown> = useHistory();
  
  const [request, setRequest] = useRecoilState<IRegisterRequest>(requestRegisterState);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(registerLoading);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setRequest((request: IRegisterRequest) => ({
      ...request,
      email: value,
    }));
  }, [setRequest]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setRequest((request: IRegisterRequest) => ({
      ...request,
      description: value,
    }));
  }, [setRequest]);

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setRequest((request: IRegisterRequest) => ({
      ...request,
      location: value,
    }));
  }, [setRequest]);

  const onChangeBlog = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setRequest((request: IRegisterRequest) => ({
      ...request,
      blog: value,
    }));
  }, [setRequest]);

  const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setRequest((request: IRegisterRequest) => ({
      ...request,
      position: value,
    }));
  }, [setRequest]);

  const onChangeGeneration = useCallback((generation: number): void => {
    setRequest((request: IRegisterRequest) => ({
      ...request,
      generation,
    }));
  }, [setRequest]);

  const onChangeMajor = useCallback((major: number): void => {
    setRequest((request: IRegisterRequest) => ({
      ...request,
      major,
    }));
  }, [setRequest]);
  
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
  }, [code, history, setRequest]);

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
    onChangeEmail,
    onChangeDescription,
    onChangeLocation,
    onChangeBlog,
    onChangePosition,
    onChangeGeneration,
    onChangeMajor,
    requestRegister,
  };
}; 

export default useRegister;