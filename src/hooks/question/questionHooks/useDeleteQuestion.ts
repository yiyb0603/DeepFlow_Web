import { useCallback } from 'react';
import { deletePost } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import Toast from 'lib/Toast';
import { IResponse } from 'types/Response';
import { historySingleton } from 'lib/singleton/history';
import usePostCallback from 'hooks/callback/usePostCallback';

const useDeleteQuestion = () => {
  const { requestPostCallback } = usePostCallback();

  const requestDeleteQuestion = useCallback(async (questionIdx: number, isDetail: boolean = true): Promise<void> => {
    try {
      const { status }: IResponse = await deletePost(questionIdx);

      if (status === EResponse.OK) {
        Toast.successToast('글을 삭제하였습니다.');
        requestPostCallback();

        if (isDetail) {
          historySingleton.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestPostCallback]);

  return {
    requestDeleteQuestion,
  };
}

export default useDeleteQuestion;