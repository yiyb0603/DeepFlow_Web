import { useCallback, useMemo, useState } from 'react';
import { CHUNK_PAGE_COUNT } from 'constants/util';
import { paginationNumber } from 'util/paginationNumber';
import useQueryString from './useQueryString';
import { historySingleton } from 'lib/singleton/history';

const usePagination = () => {
  const query = useQueryString();
  const page: number = useMemo(() => isNaN(Number(query.page)) ? 1 : Number(query.page), [query]);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [numberListPage, setNumberListPage] = useState<number>(Math.ceil(currentPage / CHUNK_PAGE_COUNT) || 1);
  const splitedNumberList: number[][] = useMemo(() => paginationNumber(totalPage), [totalPage]);

  const onChangeCurrentPage = useCallback((page: number): void => {
    if (currentPage !== page) {
      historySingleton.push(`?page=${page}`);
      setCurrentPage(page);
    }
  }, [currentPage, setCurrentPage]);

  const handlePrevPage = useCallback((): void => {
    if (numberListPage === 1) {
      setNumberListPage(splitedNumberList.length);
      return;
    }

    setNumberListPage((prevListPage: number) => prevListPage - 1);
  }, [numberListPage, splitedNumberList]);

  const handleNextPage = useCallback((): void => {
    if (numberListPage === splitedNumberList.length) {
      setNumberListPage(1);
      return;
    }

    setNumberListPage((prevListPage: number) => prevListPage + 1);
  }, [numberListPage, splitedNumberList]);

  return {
    totalPage,
    setTotalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  };
}

export default usePagination;