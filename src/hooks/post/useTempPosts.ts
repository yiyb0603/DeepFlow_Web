import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { questionListLoadingState, tempQuestionState } from 'atom/question';
import { getTempPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion } from 'types/question.types';

const useTempPosts = () => {
  const [tempPosts, setTempPosts] = useRecoilState<IQuestion[]>(tempQuestionState);
  const [questionLoading, setQuestionLoading] = useRecoilState<boolean>(questionListLoadingState);

  const requestTempPosts = useCallback(async (): Promise<void> => {
    try {
      setQuestionLoading(true);
      const { status, data: { posts } } = await getTempPosts();

      if (status === EResponse.OK) {
        setTempPosts(posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionLoading(false);
    }
  }, [setQuestionLoading, setTempPosts]);

  return {
    tempPosts,
    questionLoading,
    requestTempPosts,
  };
};

export default useTempPosts;