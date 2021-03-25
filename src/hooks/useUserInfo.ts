import { useState, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'atom/user';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import usePageParam from './util/usePageParam';
import { IUser } from 'types/user.types';

const useUserInfo = () => {
  const userIdx: number = usePageParam();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);

  const requestUserInfo = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { user } } = await getUserInfo(userIdx);

      if (status === EResponse.OK) {
        setUserInfo(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUserInfo, userIdx]);
  
  useEffect(() => {
    if (Number.isInteger(userIdx)) {
      requestUserInfo();
    }
  }, [requestUserInfo, userIdx]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
  };
}

export default useUserInfo;