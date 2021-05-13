import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questionListLoadingState, questionListState } from 'lib/recoil/atom/question';
import usePagination from 'hooks/util/usePagination';
import { EQuestionSort } from 'lib/enum/question';
import { IQuestion, IQuestionListResponse } from 'types/question.types';
import useTabState from 'hooks/util/useTabState';
import { questionListSelector } from 'lib/recoil/selector/question';

const useQuestions = () => {
  const [sortTab, onChangeSortTab] = useTabState<EQuestionSort>('sort', EQuestionSort.RECENT);
  const [questionLoading, setQuestionLoading] = useRecoilState<boolean>(questionListLoadingState);

  const {
    totalPage,
    setTotalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePagination();

  const question: IQuestionListResponse = useRecoilValue<IQuestionListResponse>(
    questionListSelector({
      page: currentPage,
      sort: sortTab,
    }));
  const [questionList, setQuestionList] = useRecoilState<IQuestion[]>(questionListState);

  const requestQuestionList = useCallback((): void => {
    try {
      setQuestionLoading(true);
      setTotalPage(question.data.totalPage!);
      setQuestionList(question.data.posts);
      setQuestionLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [question, setQuestionList, setQuestionLoading, setTotalPage]);

  return {
    questionLoading,
    questionList,
    totalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,

    numberListPage,
    splitedNumberList,

    sortTab,
    onChangeSortTab,

    requestQuestionList,
  };
}

export default useQuestions;