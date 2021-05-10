import { deleteRecommand } from 'lib/api/userRecommand/userRecommand.api';
import { EResponse } from 'lib/enum/response';
import { useCallback, MouseEvent } from 'react';
import useRecommandList from './useRecommandList';

const useDeleteRecommand = () => {
  const { requestRecommandList } = useRecommandList();

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

  return {
    requestDeleteRecommand,
  };
}

export default useDeleteRecommand;