import { useCallback } from 'react';
import useQuestions from 'hooks/question/questionHooks/useQuestions';
import usePopularQuestions from 'hooks/question/usePopularQuestions';
import useRecentQuestions from 'hooks/question/useRecentQuestions';

const usePostCallback = () => {
  const { questionListCallback } = useQuestions();
  const { recentQuestionsCallback } = useRecentQuestions();
  const { popularQuestionsCallback } = usePopularQuestions();

  const requestPostCallback = useCallback((): void => {
    questionListCallback();
    recentQuestionsCallback();
    popularQuestionsCallback();
  }, [questionListCallback, recentQuestionsCallback, popularQuestionsCallback]);

  return {
    requestPostCallback,
  };
}

export default usePostCallback;