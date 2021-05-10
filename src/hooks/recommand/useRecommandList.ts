import { userRecommandListState, userRecommandReasonState } from 'atom/userRecommand';
import useUserInfo from 'hooks/user/useUserInfo';
import usePageParam from 'hooks/util/usePageParam';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import { EResponse } from 'lib/enum/response';
import { useCallback, useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { IUserRecommand } from 'types/userRecommand.types';

const useRecommandList = () => {
  const userIdx: number = usePageParam();
  const { userInfo, requestUserInfo } = useUserInfo();

  const [userRecommands, setUserRecommands] = useRecoilState<IUserRecommand[]>(userRecommandListState);
  const setReason: SetterOrUpdater<string> = useSetRecoilState<string>(userRecommandReasonState);

  const requestRecommandList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { recommands } } = await getRecommandsByUserIdx(userIdx);

      if (status === EResponse.OK) {
        setUserRecommands(recommands);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserRecommands, userIdx]);

  useEffect(() => {
    if (!userInfo) {
      requestUserInfo();
      requestRecommandList();
    }

    return () => setReason('');
  }, [requestRecommandList, requestUserInfo, setReason, userInfo]);

  return {
    userInfo,
    userRecommands,
    requestRecommandList,
  };
}

export default useRecommandList;