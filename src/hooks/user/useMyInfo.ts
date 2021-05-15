import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myInfoState } from 'lib/recoil/atom/user';
import { IToken, IUser, IUserResponse } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { userInfoSelector } from 'lib/recoil/selector/user';
import { isNullOrUndefined } from 'util/isNullOrUndefined';

const useMyInfo = () => {
  const [myInfo, setMyInfo] = useRecoilState<IUser | null>(myInfoState);
  const myToken: IToken = useMemo(() => getMyInfo(), []);

  const userInfoResonse: IUserResponse | null = useRecoilValue(userInfoSelector(myToken ? myToken.idx : null));

  const requestMyInfo = useCallback(async (): Promise<void> => {
    if (!isNullOrUndefined(userInfoResonse!.data)) {
      setMyInfo(userInfoResonse!.data.user);
    }
  }, [setMyInfo, userInfoResonse]);

  useEffect(() => {
    if (myToken) {
      requestMyInfo();
    }
  }, [myToken, requestMyInfo]);

  return {
    myInfo,
    setMyInfo,
    requestMyInfo,
  };
};

export default useMyInfo;