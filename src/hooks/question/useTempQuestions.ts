import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { questionListLoadingState, tempQuestionState } from 'lib/recoil/atom/question';
import { getTempPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion } from 'types/question.types';

const useTempQuestions = () => {
  const [tempQuestions, setTempQuestions] = useRecoilState<IQuestion[]>(tempQuestionState);
  const [questionLoading, setQuestionLoading] = useRecoilState<boolean>(questionListLoadingState);

  const requestTempQuestions = useCallback(async (): Promise<void> => {
    try {
      setQuestionLoading(true);
      const { status, data: { posts } } = await getTempPosts();

      if (status === EResponse.OK) {
        setTempQuestions(posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionLoading(false);
    }
  }, [setQuestionLoading, setTempQuestions]);

  return {
    tempQuestions,
    questionLoading,
    requestTempQuestions,
  };
};

export default useTempQuestions;