import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { getPostsByCategory, getPostsByTag, getTempPosts } from 'lib/api/post/post.api';
import { EPost } from 'lib/enum/post';
import { EResponse } from 'lib/enum/response';
import { questionListState, tagPostState, tempPostState } from 'atom/post';
import { IPost } from 'types/post.types';
import usePagination from 'hooks/util/usePagination';

const usePosts = (category?: EPost) => {
  const { tag }: { tag: string } = useParams();
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
      const { status, data: { posts, totalPage } } = await getPostsByCategory(category!, currentPage);

      if (status === EResponse.OK) {
        setQuestionList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, currentPage, setQuestionList, setTotalPage]);

  const requestTempPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { posts } } = await getTempPosts();

      if (status === EResponse.OK) {
        setTempPosts(posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setTempPosts]);
  
  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { posts, totalPage } } = await getPostsByTag(tag, category!);

      if (status === EResponse.OK) {
        setTagPostList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, setTagPostList, setTotalPage, tag]);

  useEffect(() => {
    requestPostList();
  }, [requestPostList, currentPage]);

  return {
    questionList,
    totalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,

    numberListPage,
    splitedNumberList,

    tagPostList,
    requestPostsByTag,

    tempPosts,
    requestTempPosts,
  };
}

export default usePosts;