import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { postListLoadingState, questionListState } from 'atom/question';
import usePagination from 'hooks/util/usePagination';
import { getPostsBySort } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { EPostSort } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import useTabState from 'hooks/util/useTabState';

const usePosts = () => {
  const [sortTab, onChangeSortTab] = useTabState<EPostSort>('sort', EPostSort.RECENT);

  const [postLoading, setPostLoading] = useRecoilState<boolean>(postListLoadingState);
  const [questionList, setQuestionList] = useRecoilState<IPost[]>(questionListState);

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
      setPostLoading(true);
      const { status, data: { posts, totalPage } } = await getPostsBySort(sortTab, currentPage);

      if (status === EResponse.OK) {
        setQuestionList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [currentPage, setPostLoading, setQuestionList, setTotalPage, sortTab]);

  return {
    postLoading,
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