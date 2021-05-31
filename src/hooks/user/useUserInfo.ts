import { useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { userInfoState, userMountedState } from 'lib/recoil/atom/user';
import { userInfoSelector } from 'lib/recoil/selector/user';
import isNullOrUndefined from 'util/isNullOrUndefined';
import { IUser, IUserResponse } from 'types/user.types';
import usePageParam from '../util/usePageParam';
import UserError from 'error/UserError';

const useUserInfo = () => {
  const userIdx: number = usePageParam();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);
  const [userMounted, setUserMounted] = useRecoilState<boolean>(userMountedState);

  const userResponse: IUserResponse | null = useRecoilValue(userInfoSelector(userIdx));

  const requestUserInfo = useCallback((): void => {
    if (isNullOrUndefined(userResponse!.data) || userMounted) {
      return;
    }

    setIsLoading(true);

    const { user } = userResponse!.data;
    setUserInfo(user);

    setIsLoading(false);
  }, [setUserInfo, userMounted, userResponse]);

  const requestUserInfoCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { user } } = await getUserInfo(userIdx);

      if (status === EResponse.OK) {
        setUserInfo(user);
        setUserMounted(true);
      }
    } catch (error) {
      new UserError(error).getUserError();
    }
  }, [setUserInfo, setUserMounted, userIdx]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
    requestUserInfo,
    requestUserInfoCallback,
  };
}

export default useUserInfo;