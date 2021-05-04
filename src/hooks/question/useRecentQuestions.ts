import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recentQuestionLoading, recentQuestionState } from 'atom/question';
import { getRecentPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion, IRecentPostListResponse } from 'types/question.types';
import { RECENT_COUNT } from 'constants/question';

const useRecentQuestions = () => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(recentQuestionLoading);
  const [recentQuestions, setRecentQuestions] = useRecoilState<IQuestion[]>(recentQuestionState);

  const requestRecentQuestions = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { recentPosts } }: IRecentPostListResponse = await getRecentPosts(RECENT_COUNT);
      
      if (status === EResponse.OK) {
        setRecentQuestions(recentPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setRecentQuestions]);

  useEffect(() => {
    requestRecentQuestions();
  }, [requestRecentQuestions]);

  return {
    isLoading,
    recentQuestions,
  };
};

export default useRecentQuestions;