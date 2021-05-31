import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popluarQuestionMountedState, popularQuestionState } from 'lib/recoil/atom/question/popularQuestion';
import { popularQuestionSelector } from 'lib/recoil/selector/question';
import { POPULAR_COUNT } from 'constants/question';
import { getPopularPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IPopularQuestionListResponse, IQuestion } from 'types/question.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const usePopularQuestions = () => {
  const [popularQuestionMounted, setPopularQuestionMounted] = useRecoilState<boolean>(popluarQuestionMountedState);
  const [popularQuestions, setPopularQuestions] = useRecoilState<IQuestion[]>(popularQuestionState);
  const popularQuestionResponse: IPopularQuestionListResponse = useRecoilValue(popularQuestionSelector(POPULAR_COUNT));

  const requestPopularQuestions = useCallback((): void => {
    if (isNullOrUndefined(popularQuestionResponse.data) || popularQuestionMounted) {
      return;
    }

    const { popularPosts } = popularQuestionResponse.data;
    setPopularQuestions(popularPosts);
  }, [popularQuestionMounted, popularQuestionResponse, setPopularQuestions]);

  const popularQuestionsCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { popularPosts } } = await getPopularPosts(POPULAR_COUNT);
      
      if (status === EResponse.OK) {
        setPopularQuestions(popularPosts);
        setPopularQuestionMounted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularQuestionMounted, setPopularQuestions]);

  return {
    popularQuestions,
    requestPopularQuestions,
    popularQuestionsCallback,
  };
}

export default usePopularQuestions;