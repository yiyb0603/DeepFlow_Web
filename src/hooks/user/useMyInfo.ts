import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { myInfoState } from 'atom/user';
import { getUserInfo } from 'lib/api/user/user.api';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { EResponse } from 'lib/enum/response';

const useMyInfo = () => {
  const [myInfo, setMyInfo] = useRecoilState<IUser | null>(myInfoState);
  const myToken: IToken = useMemo(() => getMyInfo(), []);

  const requestMyInfo = useCallback(async (idx: number): Promise<void> => {
    try {
      const { status, data } = await getUserInfo(idx);

      if (status === EResponse.OK) {
        setMyInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setMyInfo]);

  useEffect(() => {
    if (myToken) {
      requestMyInfo(myToken.idx);
    }
  }, [myToken, requestMyInfo]);

  return {
    myInfo,
    setMyInfo,
    requestMyInfo,
  };
};

export default useMyInfo;