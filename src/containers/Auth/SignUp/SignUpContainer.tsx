import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { History } from 'history';
import SignUp from "components/Auth/SignUp";
import { IGithubCodeDto } from 'lib/api/auth/auth.dto';
import { getGithubInfo, handleRegister } from 'lib/api/auth/auth.api';
import { useRecoilState } from 'recoil';
import { githubInfoState, registerLoading } from 'atom/auth';
import { IGithubResponse, ILoginResponse, IRegisterRequest } from 'types/user.types';
import { groupingState } from 'converter/groupingState';
import { EMajor } from 'lib/enum/majors';
import AuthError from 'error/AuthError';
import { setCookie } from 'lib/Cookie';
import { successToast } from 'lib/Toast';
import { validateSignUp } from 'validation/auth.validation';
import GithubLoading from 'components/Auth/GithubLoading';

const SignUpContainer = (): JSX.Element => {
  const { search } = useLocation();
  const { code } = queryString.parse(search);

  const history: History<unknown> = useHistory();

  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [blog, setBlog] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  const [generation, setGeneration] = useState<number>(1);
  const [major, setMajor] = useState(EMajor.SOFTWARE);

  const [githubInfo, setGithubInfo] = useRecoilState(githubInfoState);
  const [isLoading, setIsLoading] = useRecoilState(registerLoading);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setDescription(value);
  }, []);

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setLocation(value);
  }, []);

  const onChangeBlog = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setBlog(value);
  }, []);

  const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setPosition(value);
  }, []);

  const onChangeGeneration = useCallback((generation: number): void => {
    setGeneration(generation);
  }, []);

  const onChangeMajor = useCallback((major: number): void => {
    setMajor(major);
  }, []);
  
  const requestLoginOrGithubInfo = useCallback(async (): Promise<void> => {
    try {
      const githubInfo: IGithubCodeDto = {
        code: String(code),
      };

      const { status, data }: IGithubResponse = await getGithubInfo(githubInfo);
      if (status === 200) {
        if (data.accessToken !== undefined) {
          const { accessToken } = data;
          
          setCookie('accessToken', accessToken);
          history.push('/');
          successToast('로그인 되었습니다.');
          return;
        }

        const { githubInfo: { description, location, blog } } = data;

        setGithubInfo(data.githubInfo);
        setDescription(description);
        setLocation(location);
        setBlog(blog);
      }
    } catch (error) {
      new AuthError(error).registerError(history);
    }
  }, [code, history, setGithubInfo]);

  const requestRegister = useCallback(async (): Promise<void> => {
    try {
      const { avatar, githubId, name } = githubInfo!;

      const request: IRegisterRequest = {
        githubInfo: {
          avatar,
          githubId,
          name,
          description,
          location,
          blog,
        },

        generation,
        major,
        position,
      };

      if (!validateSignUp(request)) {
        return;
      }

      setIsLoading(true);
      const { status, data }: ILoginResponse = await handleRegister(request);

      if (status === 200) {
        setCookie('accessToken', data.accessToken);
        history.push('/');
        successToast('회원가입을 성공하였습니다.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [blog, description, generation, githubInfo, history, location, major, position, setIsLoading]);

  useEffect(() => {
    requestLoginOrGithubInfo();
  }, [requestLoginOrGithubInfo]);

  return (
    <>
    {
      githubInfo === null ? <GithubLoading /> :
      <SignUp
        isLoading={isLoading}
        githubInfo={githubInfo}
        descriptionState={groupingState('description', description, onChangeDescription)}
        locationState={groupingState('location', location, onChangeLocation)}
        blogState={groupingState('blog', blog, onChangeBlog)}
        positionState={groupingState('position', position, onChangePosition)}
        generationState={groupingState('generation', generation, onChangeGeneration)}
        majorState={groupingState('major', major, onChangeMajor)}
        requestRegister={requestRegister}
      />
    }
    </>
  );
};

export default SignUpContainer;