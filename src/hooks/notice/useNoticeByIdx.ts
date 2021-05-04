import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { noticeState } from 'atom/notice';
import usePageParam from 'hooks/util/usePageParam';
import { getNoticeByIdx } from 'lib/api/notice/notice.api';
import { EResponse } from 'lib/enum/response';
import { INotice } from 'types/notice.types';

const useNoticeByIdx = () => {
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

  useEffect(() => {
    if (Number.isInteger(noticeIdx)) {
      requestNoticeByIdx();
    }
  }, [noticeIdx, requestNoticeByIdx]);

  return {
    noticeIdx,
    notice,
  };
}

export default useNoticeByIdx;