import { recentPostState } from 'atom/post';
import { getRecentPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IRecentPostListResponse } from 'types/post.types';

const useRecentPosts = () => {
  const POST_COUNT: number = 6;
  const [recentPosts, setRecentPosts] = useRecoilState(recentPostState);

  const requestRecentPosts = useCallback(async () => {
    try {
      const { status, data }: IRecentPostListResponse = await getRecentPosts(POST_COUNT);
      
      if (status === EResponse.OK) {
        setRecentPosts(data.recentPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setRecentPosts]);

  useEffect(() => {
    requestRecentPosts();
  }, [requestRecentPosts]);

  return {
    recentPosts,
  };
};

export default useRecentPosts;