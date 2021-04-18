import { useCallback, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { userRecommandListState, userRecommandReasonState } from 'atom/userRecommand';
import { createRecommand, deleteRecommand, getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import usePageParam from '../util/usePageParam';
import { EResponse } from 'lib/enum/response';
import { IRecommandDto } from 'lib/api/userRecommand/userRecommand.dto';
import { validateRecommand } from 'validation/recommand.validation';
import useUserInfo from './useUserInfo';
import RecommandError from 'error/RecommandError';

const useRecommand = () => {
  const userIdx: number = usePageParam();
  const { userInfo, requestUserInfo } = useUserInfo();

  const [reason, setReason] = useRecoilState<string>(userRecommandReasonState);
  const [userRecommands, setUserRecommands] = useRecoilState(userRecommandListState);

  const onChangeReason = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setReason(value);
  }, [setReason]);

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

  const requestCreateRecommand = useCallback(async (): Promise<void> => {
    try {
      const recommandDto: IRecommandDto = {
        userIdx,
        reason,
      };

      if (!validateRecommand(recommandDto)) {
        return;
      }

      const { status } = await createRecommand(recommandDto);
      if (status === EResponse.OK) {
        setReason('');
        await requestRecommandList();
      }
    } catch (error) {
      new RecommandError(error).createRecommandError();
    }
  }, [reason, requestRecommandList, setReason, userIdx]);

  const requestDeleteRecommand = useCallback(async (
      e: MouseEvent<SVGElement>,
      recommandIdx: number,
    ): Promise<void> => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const { status } = await deleteRecommand(recommandIdx);
      
      if (status === EResponse.OK) {
        await requestRecommandList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestRecommandList]);

  useEffect(() => {
    if (!userInfo) {
      requestUserInfo();
      requestRecommandList();
    }

    return () => setReason('');
  }, [requestRecommandList, requestUserInfo, setReason, userInfo]);

  return {
    userInfo,
    reason,
    onChangeReason,
    requestCreateRecommand,
    requestDeleteRecommand,
    
    userRecommands,
  };
}

export default useRecommand;