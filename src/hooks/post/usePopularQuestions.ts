import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { popularQuestionState } from 'atom/question';
import { POPULAR_COUNT } from 'constants/question';
import { getPopularPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion } from 'types/question.types';

const usePopularQuestions = () => {
  const [popularQuestions, setPopularQuestions] = useRecoilState<IQuestion[]>(popularQuestionState);

  const requestPopularQuestions = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { popularQuestions } } = await getPopularPosts(POPULAR_COUNT);

      if (status === EResponse.OK) {
        setPopularQuestions(popularQuestions);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularQuestions]);

  useEffect(() => {
    requestPopularQuestions();
  }, [requestPopularQuestions]);

  return {
    popularQuestions,
  };
}

export default usePopularQuestions;