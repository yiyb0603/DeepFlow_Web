import { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userRecommandListState } from 'atom/userRecommand';
import { createRecommand, deleteRecommand, getRecommandsByUserIdx } from 'lib/api/userRecommand/userRecommand.api';
import usePageParam from './util/usePageParam';
import { EResponse } from 'lib/enum/response';
import { IRecommandDto } from 'lib/api/userRecommand/userRecommand.dto';
import { validateRecommand } from 'validation/recommand.validation';

const useRecommand = () => {
  const userIdx: number = usePageParam();

  const [reason, setReason] = useState<string>('');
  const [userRecommands, setUserRecommands] = useRecoilState(userRecommandListState);

  const onChangeReason = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setReason(value);
  }, []);

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
      if (!validateRecommand(reason)) {
        return;
      }
      
      const recommandDto: IRecommandDto = {
        userIdx,
        reason,
      };

      const { status } = await createRecommand(recommandDto);

      if (status === EResponse.OK) {
        setReason('');
        await requestRecommandList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [reason, requestRecommandList, userIdx]);

  const requestDeleteRecommand = useCallback(async (recommandIdx: number): Promise<void> => {
    try {
      const { status } = await deleteRecommand(recommandIdx);
      
      if (status === EResponse.OK) {
        await requestRecommandList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestRecommandList]);

  return {
    reason,
    onChangeReason,
    requestCreateRecommand,
    requestDeleteRecommand,

    userRecommands,
    requestRecommandList,
  };
}

export default useRecommand;