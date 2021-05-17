import { useCallback } from 'react';
import useRecommandList from 'hooks/recommand/useRecommandList';
import usePopularUsers from 'hooks/user/usePopularUsers';

const useRecommandCallback = () => {
  const { recommandListCallback } = useRecommandList();
  const { popularUsersCallback } = usePopularUsers();

  const requestRecommandCallback = useCallback((): void => {
    recommandListCallback();
    popularUsersCallback();
  }, [popularUsersCallback, recommandListCallback]);

  return {
    requestRecommandCallback,
  };
}

export default useRecommandCallback;