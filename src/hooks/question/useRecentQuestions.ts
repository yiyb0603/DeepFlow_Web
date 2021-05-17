import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getRecentPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { recentQuestionLoading, recentQuestionState } from 'lib/recoil/atom/question';
import { recentQuestionSelector } from 'lib/recoil/selector/question';
import { isNullOrUndefined } from 'util/isNullOrUndefined';
import { IQuestion, IRecentPostListResponse } from 'types/question.types';
import { RECENT_COUNT } from 'constants/question';

const useRecentQuestions = () => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(recentQuestionLoading);
  const [recentQuestions, setRecentQuestions] = useRecoilState<IQuestion[]>(recentQuestionState);

  const recentQuestionResponse: IRecentPostListResponse = useRecoilValue(recentQuestionSelector(RECENT_COUNT));

  const requestRecentQuestions = useCallback((): void => {
    if (!isNullOrUndefined(recentQuestionResponse.data)) {
      setIsLoading(true);
      setRecentQuestions(recentQuestionResponse.data.recentPosts);
      setIsLoading(false);
    }
  }, [recentQuestionResponse, setIsLoading, setRecentQuestions]);

  const recentQuestionsCallback = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { status, data: { recentPosts } } = await getRecentPosts(RECENT_COUNT);

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
    recentQuestionsCallback,
  };
};

export default useRecentQuestions;