import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory, useParams } from 'react-router-dom';
import { History } from 'history';
import { getPostsByCategory, getPostsByTag } from 'lib/api/post/post.api';
import { EPost } from 'lib/enum/post';
import { EResponse } from 'lib/enum/response';
import { questionListState, tagPostState } from 'atom/post';
import { IPost } from 'types/post.types';
import useQueryString from './util/useQueryString';
import { paginationNumber } from 'util/paginationNumber';

const usePosts = (category: EPost) => {
  const { tag }: { tag: string } = useParams();
  const query = useQueryString();
  const page: number = useMemo(() => isNaN(Number(query.page)) ? 1 : Number(query.page), [query]);

  const [currentPage, setCurrentPage] = useState<number>(page);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [questionList, setQuestionList] = useRecoilState<IPost[]>(questionListState);
  const [tagPostList, setTagPostList] = useRecoilState<IPost[]>(tagPostState);

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
  
  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { posts, totalPage } } = await getPostsByTag(tag, category);

      if (status === EResponse.OK) {
        setTagPostList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, setTagPostList, tag]);

  useEffect(() => {
    return () => setTotalPage(1);
  }, []);

  return {
    questionList,
    totalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    requestPostList,

    numberListPage,
    splitedNumberList,

    tagPostList,
    requestPostsByTag,
  };
}

export default usePosts;