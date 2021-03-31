import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recentPostLoading, recentPostState } from 'atom/post';
import { getRecentPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { IRecentPostListResponse } from 'types/post.types';
import { RECENT_COUNT } from 'constants/post';

const useRecentPosts = () => {
  const [isLoading, setIsLoading] = useRecoilState(recentPostLoading);
  const [recentPosts, setRecentPosts] = useRecoilState(recentPostState);

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