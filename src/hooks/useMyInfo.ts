import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'atom/user';
import { getUserInfo } from 'lib/api/user/user.api';
import { IToken, IUser } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { EResponse } from 'lib/enum/response';

const useMyInfo = () => {
  const [myInfo, setMyInfo] = useRecoilState<IUser | null>(userInfoState);

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
    const myToken: IToken = getMyInfo();
    if (myToken) {
      requestMyInfo(myToken.idx);
    }
  }, [requestMyInfo]);

  return {
    myInfo,
    setMyInfo,
  };
};

export default useMyInfo;