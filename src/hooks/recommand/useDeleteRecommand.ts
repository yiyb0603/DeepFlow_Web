import { useCallback, MouseEvent } from 'react';
import { deleteRecommand } from 'lib/api/userRecommand/userRecommand.api';
import { EResponse } from 'lib/enum/response';
import useRecommandCallback from 'hooks/callback/useRecommandCallback';

const useDeleteRecommand = () => {
  const { requestRecommandCallback } = useRecommandCallback();

  const requestDeleteRecommand = useCallback(async (
    e: MouseEvent<SVGElement>,
    recommandIdx: number,
  ): Promise<void> => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const { status } = await deleteRecommand(recommandIdx);
      
      if (status === EResponse.OK) {
        requestRecommandCallback();
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestRecommandCallback]);

  return {
    requestDeleteRecommand,
  };
}

export default useDeleteRecommand;