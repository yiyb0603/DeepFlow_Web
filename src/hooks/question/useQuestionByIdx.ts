import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { questionState } from 'atom/question';
import { IQuestion, IQuestionResponse } from 'types/question.types';
import { deletePost, getPostByIdx } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import PostError from 'error/PostError';
import usePageParam from '../util/usePageParam';
import { successToast } from 'lib/Toast';
import { IResponse } from 'types/Response';

const useQuestionByIdx = () => {
  const history: History = useHistory();
  const questionIdx: number = usePageParam();
  const [question, setQuestion] = useRecoilState<IQuestion | null>(questionState);

  const requestQuestionByIdx = useCallback(async (): Promise<void> => {
    try {
      const { status, data }: IQuestionResponse = await getPostByIdx(questionIdx);

      if (status === EResponse.OK) {
        setQuestion(data.post);
      }
    } catch (error) {
      new PostError(error).getPostError(history);
    }
  }, [history, questionIdx, setQuestion]);

  const requestDeleteQuestion = useCallback(async (questionIdx: number, isDetail: boolean = true): Promise<void> => {
    try {
      const { status }: IResponse = await deletePost(questionIdx);

      if (status === EResponse.OK) {
        successToast('글을 삭제하였습니다.');
        
        if (isDetail) {
          history.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  useEffect(() => {
    if (Number.isInteger(questionIdx)) {
      requestQuestionByIdx();
    }

    return () => setQuestion(null);
  }, [questionIdx, requestQuestionByIdx, setQuestion]);

  return {
    question,
    requestDeleteQuestion,
  };
};

export default useQuestionByIdx;