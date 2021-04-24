import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { postListLoadingState, questionListState, tagPostState, tempPostState } from 'atom/post';
import usePagination from 'hooks/util/usePagination';
import { getPostsBySort, getPostsByTag, getTempPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { EPostSort } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import useTabState from 'hooks/util/useTabState';

const usePosts = () => {
  const { tag }: { tag: string } = useParams();
  const [sortTab, onChangeSortTab] = useTabState<EPostSort>('sort', EPostSort.RECENT);

  const [postLoading, setPostLoading] = useRecoilState<boolean>(postListLoadingState);
  const [questionList, setQuestionList] = useRecoilState<IPost[]>(questionListState);
  const [tagPostList, setTagPostList] = useRecoilState<IPost[]>(tagPostState);
  const [tempPosts, setTempPosts] = useRecoilState<IPost[]>(tempPostState);

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

  const requestTempPosts = useCallback(async (): Promise<void> => {
    try {
      setPostLoading(true);
      const { status, data: { posts } } = await getTempPosts();

      if (status === EResponse.OK) {
        setTempPosts(posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [setPostLoading, setTempPosts]);
  
  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      setPostLoading(true);
      const { status, data: { posts, totalPage } } = await getPostsByTag(tag);

      if (status === EResponse.OK) {
        setTagPostList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [setPostLoading, setTagPostList, setTotalPage, tag]);

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

    tagPostList,
    requestPostsByTag,

    tempPosts,
    requestTempPosts,
  };
}

export default usePosts;