import { userRecommandReasonState } from 'atom/userRecommand';
import RecommandError from 'error/RecommandError';
import usePageParam from 'hooks/util/usePageParam';
import { createRecommand } from 'lib/api/userRecommand/userRecommand.api';
import { IRecommandDto } from 'lib/api/userRecommand/userRecommand.dto';
import { EResponse } from 'lib/enum/response';
import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { validateRecommand } from 'validation/recommand.validation';
import useRecommandList from './useRecommandList';

const useCreateRecommand = () => {
  const userIdx: number = usePageParam();
  const { requestRecommandList } = useRecommandList();

  const [reason, setReason] = useRecoilState<string>(userRecommandReasonState);

  const onChangeReason = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setReason(value);
  }, [setReason]);
  
  const requestCreateRecommand = useCallback(async (): Promise<void> => {
    if (!checkLoggedIn()) {
      return;
    }

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

  return {
    reason,
    onChangeReason,
    requestCreateRecommand,
  };
}

export default useCreateRecommand;