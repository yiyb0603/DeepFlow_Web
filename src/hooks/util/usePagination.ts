import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { paginationNumber } from 'util/paginationNumber';
import useQueryString from './useQueryString';

const usePagination = () => {
  const query = useQueryString();
  const page: number = useMemo(() => isNaN(Number(query.page)) ? 1 : Number(query.page), [query]);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [numberListPage, setNumberListPage] = useState<number>(Math.ceil(currentPage / 5) || 1);

  const history: History = useHistory();
  const splitedNumberList: number[][] = useMemo(() => paginationNumber(totalPage), [totalPage]);

  const onChangeCurrentPage = useCallback((page: number): void => {
    if (currentPage !== page) {
      history.push(`?page=${page}`);
      setCurrentPage(page);
    }
  }, [currentPage, history, setCurrentPage]);

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