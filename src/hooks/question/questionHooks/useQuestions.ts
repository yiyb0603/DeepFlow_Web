import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { questionListLoadingState, questionListState, questionMountedState } from 'lib/recoil/atom/question';
import usePagination from 'hooks/util/usePagination';
import { EQuestionSort } from 'lib/enum/question';
import { IQuestion, IQuestionListResponse } from 'types/question.types';
import useTabState from 'hooks/util/useTabState';
import { questionListSelector } from 'lib/recoil/selector/question';
import { EResponse } from 'lib/enum/response';
import { getPostsBySort } from 'lib/api/question/question.api';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useQuestions = () => {
  const [sortTab, onChangeSortTab] = useTabState<EQuestionSort>('sort', EQuestionSort.RECENT);
  const [questionLoading, setQuestionLoading] = useRecoilState<boolean>(questionListLoadingState);
  const [questionMounted, setQuestionMounted] = useRecoilState<boolean>(questionMountedState);

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

  const questionResponse: IQuestionListResponse = useRecoilValue<IQuestionListResponse>(
    questionListSelector({
      page: currentPage,
      sort: sortTab,
    }));
  const [questionList, setQuestionList] = useRecoilState<IQuestion[]>(questionListState);

  const requestQuestionList = useCallback((): void => {
    try {
      if (isNullOrUndefined(questionResponse.data) || questionMounted) {
        return;
      }

      setQuestionLoading(true);

      const { totalPage, posts } = questionResponse.data;
      setTotalPage(totalPage!);
      setQuestionList(posts);

      setQuestionLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [questionMounted, questionResponse, setQuestionList, setQuestionLoading, setTotalPage]);

  const questionListCallback = useCallback(async (): Promise<void> => {
    try {
      setQuestionLoading(true);
      const { status, data: { posts, totalPage } } = await getPostsBySort(sortTab, currentPage);

      if (status === EResponse.OK) {
        setQuestionList(posts);
        setTotalPage(totalPage!);
        setQuestionMounted(true);
      }

      setQuestionLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, setQuestionList, setQuestionLoading, setQuestionMounted, setTotalPage, sortTab]);

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
    questionListCallback,
  };
}

export default useQuestions;