import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myInfoState } from 'lib/recoil/atom/user';
import { IToken, IUser, IUserResponse } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { userInfoSelector } from 'lib/recoil/selector/user';
import isNullOrUndefined from 'util/isNullOrUndefined';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';

const useMyInfo = () => {
  const [myInfo, setMyInfo] = useRecoilState<IUser | null>(myInfoState);
  const myToken: IToken = useMemo(() => getMyInfo(), []);

  const userInfoResonse: IUserResponse | null = useRecoilValue(userInfoSelector(myToken ? myToken.idx : null));

  const requestMyInfo = useCallback(async (): Promise<void> => {
    if (isNullOrUndefined(userInfoResonse?.data) || isNullOrUndefined(myToken)) {
      return;
    }

    setMyInfo(userInfoResonse!.data.user);
  }, [myToken, setMyInfo, userInfoResonse]);

  const requestMyInfoCallback = useCallback(async () => {
    try {
      if (isNullOrUndefined(myToken)) {
        return;
      }

      const { status, data: { user } } = await getUserInfo(myToken.idx);
      
      if (status === EResponse.OK) {
        setMyInfo(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [myToken, setMyInfo]);

  return {
    myInfo,
    setMyInfo,
    requestMyInfo,
    requestMyInfoCallback,
  };
};

export default useMyInfo;