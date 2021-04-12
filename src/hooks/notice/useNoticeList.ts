import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { noticeListState } from 'atom/notice'
import { getNoticeList } from 'lib/api/notice/notice.api';
import { EResponse } from 'lib/enum/response';
import { INotice } from 'types/notice.types';

const useNoticeList = () => {
  const [page, setPage] = useState<number>(1);
  const [noticeList, setNoticeList] = useRecoilState<INotice[]>(noticeListState);

  const requestNoticeList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { notices } } = await getNoticeList(page);

      if (status === EResponse.OK) {
        setNoticeList(notices);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, setNoticeList]);

  const handleSetCount = useCallback((page: number | null): void => {
    if (page === null) {
      setPage((prevPage: number) => prevPage + 1);
    } else {
      setPage(page);
    }
  }, []);

  useEffect(() => {
    requestNoticeList();
  }, [requestNoticeList]);

  return {
    noticeList,
    handleSetCount,
  };
};

export default useNoticeList;