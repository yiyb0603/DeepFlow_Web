import { useCallback, useEffect, useMemo, useState } from 'react';
import { getPostsByCategory } from 'lib/api/post/post.api';
import { EPost } from 'lib/enum/post';
import { EResponse } from 'lib/enum/response';
import { useRecoilState } from 'recoil';
import { questionListState } from 'atom/post';
import { IPost } from 'types/post.types';
import useQueryString from './util/useQueryString';

const usePosts = (category: EPost) => {
  const query = useQueryString();
  const page: number = useMemo(() => isNaN(Number(query.page)) ? 1 : Number(query.page), [query]);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [questionList, setQuestionList] = useRecoilState<IPost[]>(questionListState);

  const requestPostList = useCallback(async () => {
    try {
      const { status, data: { posts, totalPage } } = await getPostsByCategory(category, currentPage);

      if (status === EResponse.OK) {
        setQuestionList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, currentPage, setQuestionList]);

  useEffect(() => {
    requestPostList();
  }, [requestPostList, currentPage]);

  return {
    questionList,
    totalPage,
    currentPage,
    setCurrentPage,
  };
}

export default usePosts;