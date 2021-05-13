import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { questionState } from 'lib/recoil/atom/question';
import { IQuestion, IQuestionResponse } from 'types/question.types';
import { getPostByIdx } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import PostError from 'error/PostError';
import usePageParam from '../../util/usePageParam';

const useQuestionByIdx = () => {
  const questionIdx: number = usePageParam();
  const [question, setQuestion] = useRecoilState<IQuestion | null>(questionState);

  const requestQuestionByIdx = useCallback(async (): Promise<void> => {
    try {
      const { status, data }: IQuestionResponse = await getPostByIdx(questionIdx);

      if (status === EResponse.OK) {
        setQuestion(data.post);
      }
    } catch (error) {
      new PostError(error).getPostError();
    }
  }, [questionIdx, setQuestion]);

  useEffect(() => {
    if (Number.isInteger(questionIdx)) {
      requestQuestionByIdx();
    }

    return () => setQuestion(null);
  }, [questionIdx, requestQuestionByIdx, setQuestion]);

  return {
    question,
  };
};

export default useQuestionByIdx;