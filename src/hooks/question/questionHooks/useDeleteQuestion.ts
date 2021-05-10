import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { deletePost } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { successToast } from 'lib/Toast';
import { IResponse } from 'types/Response';

const useDeleteQuestion = () => {
  const history: History = useHistory();

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

  return {
    requestDeleteQuestion,
  };
}

export default useDeleteQuestion;