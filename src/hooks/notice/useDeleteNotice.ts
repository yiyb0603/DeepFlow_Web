import { useCallback } from 'react';
import { deleteNotice } from 'lib/api/notice/notice.api';
import { EResponse } from 'lib/enum/response';
import { historySingleton } from 'lib/singleton/history';
import Toast from 'lib/Toast';
import NoticeError from 'error/NoticeError';

const useDeleteNotice = () => {
  const requestDeleteNotice = useCallback(async (noticeIdx: number): Promise<void> => {
    try {
      const { status } = await deleteNotice(noticeIdx);

      if (status === EResponse.OK) {
        Toast.successToast('공지사항을 삭제하였습니다.');
        historySingleton.push('/notice');
      }
    } catch (error) {
      new NoticeError(error).noticeFormError();
    }
  }, []);

  return {
    requestDeleteNotice,
  };
}

export default useDeleteNotice;