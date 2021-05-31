import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { RECENT_COUNT } from 'constants/question';
import { getRecentPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { recentQuestionLoading, recentQuestionMountedState, recentQuestionState } from 'lib/recoil/atom/question/recentQuestion';
import { recentQuestionSelector } from 'lib/recoil/selector/question';
import isNullOrUndefined from 'util/isNullOrUndefined';
import { IQuestion, IRecentPostListResponse } from 'types/question.types';

const useRecentQuestions = () => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(recentQuestionLoading);
  const [recentQuestionMounted, setRecentQuestionMounted] = useRecoilState<boolean>(recentQuestionMountedState);
  const [recentQuestions, setRecentQuestions] = useRecoilState<IQuestion[]>(recentQuestionState);

  const recentQuestionResponse: IRecentPostListResponse = useRecoilValue(recentQuestionSelector(RECENT_COUNT));

  const requestRecentQuestions = useCallback((): void => {
    if (isNullOrUndefined(recentQuestionResponse.data) || recentQuestionMounted) {
      return;
    }

    setIsLoading(true);

    const { recentPosts } = recentQuestionResponse.data;
    setRecentQuestions(recentPosts);

    setIsLoading(false);
  }, [recentQuestionMounted, recentQuestionResponse, setIsLoading, setRecentQuestions]);

  const recentQuestionsCallback = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { status, data: { recentPosts } } = await getRecentPosts(RECENT_COUNT);

      if (status === EResponse.OK) {
        setRecentQuestions(recentPosts);
        setRecentQuestionMounted(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setRecentQuestionMounted, setRecentQuestions]);

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