import { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import Questions from 'components/Questions';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';
import { paginationNumber } from 'util/paginationNumber';
import { groupingState } from 'converter/groupingState';

const QuestionContainer = (): JSX.Element => {
  const { questionList, totalPage, currentPage, setCurrentPage } = usePosts(EPost.QUESTION);
  const [numberListPage, setNumberListPage] = useState<number>(Math.ceil(currentPage / 5) || 1);

  const history: History<unknown> = useHistory();
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

  return (
    <Questions
      questionList={questionList}
      currentPageState={groupingState('currentPage', currentPage, onChangeCurrentPage)}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      numberListPage={numberListPage}
      splitedNumberList={splitedNumberList}
    />
  );
}

export default QuestionContainer;