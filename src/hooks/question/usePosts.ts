import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { questionListLoadingState, questionListState } from 'atom/question';
import usePagination from 'hooks/util/usePagination';
import { getPostsBySort } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { EQuestionSort } from 'lib/enum/question';
import { IQuestion } from 'types/question.types';
import useTabState from 'hooks/util/useTabState';

const usePosts = () => {
  const [sortTab, onChangeSortTab] = useTabState<EQuestionSort>('sort', EQuestionSort.RECENT);

  const [questionLoading, setQuestionLoading] = useRecoilState<boolean>(questionListLoadingState);
  const [questionList, setQuestionList] = useRecoilState<IQuestion[]>(questionListState);

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

  const requestPostList = useCallback(async () => {
    try {
      setQuestionLoading(true);
      const { status, data: { posts, totalPage } } = await getPostsBySort(sortTab, currentPage);

      if (status === EResponse.OK) {
        setQuestionList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionLoading(false);
    }
  }, [currentPage, setQuestionLoading, setQuestionList, setTotalPage, sortTab]);

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

    requestPostList,
  };
}

export default usePosts;