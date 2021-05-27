import { useCallback, useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userRecommandListState, userRecommandReasonState } from 'lib/recoil/atom/userRecommand';
import { userRecommandListSelector } from 'lib/recoil/selector/userRecommand';
import isNullOrUndefined from 'util/isNullOrUndefined';
import useUserInfo from 'hooks/user/useUserInfo';
import usePageParam from 'hooks/util/usePageParam';
import { IUserRecommand, IUserRecommandResponse } from 'types/userRecommand.types';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';

const useRecommandList = () => {
  const userIdx: number = usePageParam();
  const { userInfo, requestUserInfo } = useUserInfo();

  const [userRecommands, setUserRecommands] = useRecoilState<IUserRecommand[]>(userRecommandListState);
  const setReason: SetterOrUpdater<string> = useSetRecoilState<string>(userRecommandReasonState);

  const userRecommandResponse: IUserRecommandResponse = useRecoilValue(userRecommandListSelector(userIdx));

  const requestRecommandList = useCallback((): void => {
    if (!isNullOrUndefined(userRecommandResponse.data)) {
      setUserRecommands(userRecommandResponse.data.recommands);
    }
  }, [setUserRecommands, userRecommandResponse]);

  const recommandListCallback = useCallback(async (): Promise<void> => {
    const { data } = await getRecommandsByUserIdx(userIdx);
    setUserRecommands(data.recommands);
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
    recommandListCallback,
  };
}

export default useRecommandList;