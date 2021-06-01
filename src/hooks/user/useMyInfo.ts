import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { myInfoMountedState, myInfoState } from 'lib/recoil/atom/user/myInfo';
import { userInfoSelector } from 'lib/recoil/selector/user';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useMyInfo = () => {
  const [myInfo, setMyInfo] = useRecoilState<IUser | null>(myInfoState);
  const [myInfoMounted, setMyInfoMounted] = useRecoilState<boolean>(myInfoMountedState);
  const myToken: IToken = useMemo(() => getMyInfo(), []);

  const userInfoResponse: IUser | null = useRecoilValue(userInfoSelector(myToken ? myToken.idx : null));

  const requestMyInfo = useCallback(async (): Promise<void> => {
    if (isNullOrUndefined(userInfoResponse) || isNullOrUndefined(myToken) || myInfoMounted) {
      return;
    }

    setMyInfo(userInfoResponse);
  }, [myInfoMounted, myToken, setMyInfo, userInfoResponse]);

  const requestMyInfoCallback = useCallback(async (): Promise<void> => {
    try {
      if (isNullOrUndefined(myToken)) {
        return;
      }

      const { status, data: { user } } = await getUserInfo(myToken.idx);

      if (status === EResponse.OK) {
        setMyInfo(user);
        setMyInfoMounted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [myToken, setMyInfo, setMyInfoMounted]);

  return {
    myInfo,
    setMyInfo,
    requestMyInfo,
    requestMyInfoCallback,
  };
};

export default useMyInfo;