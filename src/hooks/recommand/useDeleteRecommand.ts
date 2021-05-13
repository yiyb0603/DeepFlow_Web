import { deleteRecommand } from 'lib/api/userRecommand/userRecommand.api';
import { EResponse } from 'lib/enum/response';
import { useCallback, MouseEvent } from 'react';
import useRecommandList from './useRecommandList';

const useDeleteRecommand = () => {
  const { recommandListCallback } = useRecommandList();

  const requestDeleteRecommand = useCallback(async (
    e: MouseEvent<SVGElement>,
    recommandIdx: number,
  ): Promise<void> => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const { status } = await deleteRecommand(recommandIdx);
      
      if (status === EResponse.OK) {
        await recommandListCallback();
      }
    } catch (error) {
      console.log(error);
    }
  }, [recommandListCallback]);

  return {
    requestDeleteRecommand,
  };
}

export default useDeleteRecommand;