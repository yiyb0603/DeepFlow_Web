import { useCallback } from 'react';
import { deletePost } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { successToast } from 'lib/Toast';
import { IResponse } from 'types/Response';
import { historySingleton } from 'lib/singleton/history';

const useDeleteQuestion = () => {
  const requestDeleteQuestion = useCallback(async (questionIdx: number, isDetail: boolean = true): Promise<void> => {
    try {
      const { status }: IResponse = await deletePost(questionIdx);

      if (status === EResponse.OK) {
        successToast('글을 삭제하였습니다.');
        
        if (isDetail) {
          historySingleton.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    requestDeleteQuestion,
  };
}

export default useDeleteQuestion;