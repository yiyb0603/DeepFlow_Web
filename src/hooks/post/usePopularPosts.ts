import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { popularPostState } from 'atom/post';
import { POPULAR_COUNT } from 'constants/post';
import { getPopularPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';

const usePopularPosts = () => {
  const [popularPosts, setPopularPosts] = useRecoilState(popularPostState);

  const requestPopularPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { popularPosts } } = await getPopularPosts(POPULAR_COUNT);

      if (status === EResponse.OK) {
        setPopularPosts(popularPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularPosts]);

  useEffect(() => {
    requestPopularPosts();
  }, [requestPopularPosts]);

  return {
    popularPosts,
  };
}

export default usePopularPosts;