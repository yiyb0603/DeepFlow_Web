import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recentQuestionLoading, recentQuestionState } from 'atom/question';
import { getRecentPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IRecentPostListResponse } from 'types/question.types';
import { RECENT_COUNT } from 'constants/question';

const useRecentPosts = () => {
  const [isLoading, setIsLoading] = useRecoilState(recentQuestionLoading);
  const [recentPosts, setRecentPosts] = useRecoilState(recentQuestionState);

  const requestRecentPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { recentPosts } }: IRecentPostListResponse = await getRecentPosts(RECENT_COUNT);
      
      if (status === EResponse.OK) {
        setRecentPosts(recentPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setRecentPosts]);

  useEffect(() => {
    requestRecentPosts();
  }, [requestRecentPosts]);

  return {
    isLoading,
    recentPosts,
  };
};

export default useRecentPosts;