import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { popularQuestionState } from 'atom/question';
import { POPULAR_COUNT } from 'constants/post';
import { getPopularPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';

const usePopularPosts = () => {
  const [popularPosts, setPopularPosts] = useRecoilState(popularQuestionState);

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