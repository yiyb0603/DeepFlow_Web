import { useCallback } from 'react';
import useQuestions from 'hooks/question/questionHooks/useQuestions';
import usePopularQuestions from 'hooks/question/usePopularQuestions';
import useRecentQuestions from 'hooks/question/useRecentQuestions';
import useUserPost from 'hooks/user/useUserPost';

const usePostCallback = () => {
  const { questionListCallback } = useQuestions();
  const { recentQuestionsCallback } = useRecentQuestions();
  const { popularQuestionsCallback } = usePopularQuestions();
  const { requestUserPostsCallback } = useUserPost();

  const requestPostCallback = useCallback((): void => {
    questionListCallback();
    recentQuestionsCallback();
    popularQuestionsCallback();
    requestUserPostsCallback();
  }, [questionListCallback, recentQuestionsCallback, popularQuestionsCallback, requestUserPostsCallback]);

  return {
    requestPostCallback,
  };
}

export default usePostCallback;