import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useRecoilState } from 'recoil';
import { noticeState } from 'atom/notice';
import usePageParam from 'hooks/util/usePageParam';
import { deleteNotice, getNoticeByIdx } from 'lib/api/notice/notice.api';
import { EResponse } from 'lib/enum/response';
import { INotice } from 'types/notice.types';
import { successToast } from 'lib/Toast';

const useNoticeByIdx = () => {
  const history: History = useHistory();
  const noticeIdx: number = usePageParam();
  const [notice, setNotice] = useRecoilState<INotice | null>(noticeState);

  const requestNoticeByIdx = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { notice } } = await getNoticeByIdx(noticeIdx);

      if (status === EResponse.OK) {
        setNotice(notice);
      }
    } catch (error) {
      console.log(error);
    }
  }, [noticeIdx, setNotice]);

  const requestDeleteNotice = useCallback(async (noticeIdx: number): Promise<void> => {
    try {
      const { status } = await deleteNotice(noticeIdx);

      if (status === EResponse.OK) {
        successToast('공지사항을 삭제하였습니다.');
        history.push('/notice');
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  useEffect(() => {
    if (Number.isInteger(noticeIdx)) {
      requestNoticeByIdx();
    }

    return () => setNotice(null);
  }, [noticeIdx, requestNoticeByIdx, setNotice]);

  return {
    noticeIdx,
    notice,
    requestDeleteNotice,
  };
}

export default useNoticeByIdx;