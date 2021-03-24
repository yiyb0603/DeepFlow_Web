import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recentPostLoading, recentPostState } from 'atom/post';
import { getRecentPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { IRecentPostListResponse } from 'types/post.types';

const useRecentPosts = () => {
  const POST_COUNT: number = 6;
  const [isLoading, setIsLoading] = useRecoilState(recentPostLoading);
  const [recentPosts, setRecentPosts] = useRecoilState(recentPostState);

  const requestRecentPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { recentPosts } }: IRecentPostListResponse = await getRecentPosts(POST_COUNT);
      
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