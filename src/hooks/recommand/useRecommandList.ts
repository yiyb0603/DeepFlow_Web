import { useCallback, useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import { userRecommandListState, userRecommandReasonState } from 'lib/recoil/atom/userRecommand';
import { userRecommandListSelector } from 'lib/recoil/selector/userRecommand';
import isNullOrUndefined from 'util/isNullOrUndefined';
import useUserInfo from 'hooks/user/useUserInfo';
import usePageParam from 'hooks/util/usePageParam';
import { IUserRecommand } from 'types/userRecommand.types';

const useRecommandList = () => {
  const userIdx: number = usePageParam();
  const { userInfo, requestUserInfo } = useUserInfo();

  const [userRecommands, setUserRecommands] = useRecoilState<IUserRecommand[]>(userRecommandListState);
  const setReason: SetterOrUpdater<string> = useSetRecoilState<string>(userRecommandReasonState);

  const userRecommandResponse: IUserRecommand[] = useRecoilValue(userRecommandListSelector(userIdx));

  const requestRecommandList = useCallback((): void => {
    if (isNullOrUndefined(userRecommandResponse)) {
      return;
    }

    setUserRecommands(userRecommandResponse);
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