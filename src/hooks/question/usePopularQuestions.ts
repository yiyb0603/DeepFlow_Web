import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popularQuestionState } from 'lib/recoil/atom/question';
import { POPULAR_COUNT } from 'constants/question';
import { IPopularQuestionListResponse, IQuestion } from 'types/question.types';
import { popularQuestionSelector } from 'lib/recoil/selector/question';
import { isNullOrUndefined } from 'util/isNullOrUndefined';

const usePopularQuestions = () => {
  const [popularQuestions, setPopularQuestions] = useRecoilState<IQuestion[]>(popularQuestionState);
  const popularQuestionResponse: IPopularQuestionListResponse = useRecoilValue(popularQuestionSelector(POPULAR_COUNT));

  const requestPopularQuestions = useCallback((): void => {
    if (!isNullOrUndefined(popularQuestionResponse.data)) {
      setPopularQuestions(popularQuestionResponse.data.popularPosts);
    }
  }, [popularQuestionResponse, setPopularQuestions]);

  useEffect(() => {
    requestPopularQuestions();
  }, [requestPopularQuestions]);

  return {
    popularQuestions,
  };
}

export default usePopularQuestions;