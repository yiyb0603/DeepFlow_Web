import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CHUNK_POST_COUNT } from 'constants/util';
import usePageParam from 'hooks/util/usePageParam';
import usePagination from 'hooks/util/usePagination';
import useTabState from 'hooks/util/useTabState';
import { EUserQuestion } from 'lib/enum/question';
import { userQuestionState } from 'lib/recoil/atom/user';
import { userQuestionSelector } from 'lib/recoil/selector/user';
import { IQuestionListResponse, IQuestion } from 'types/question.types';
import chunkArray from 'util/chunkArray';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useUserPost = () => {
  const userIdx: number = usePageParam();

  const {
    setTotalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePagination();

  const [userPostTab, setUserPostTab] = useTabState<EUserQuestion>('tab', EUserQuestion.WRITED);
  const [userQuestionList, setUserQuestionList] = useRecoilState<IQuestion[]>(userQuestionState);
  const userQuestionResponse: IQuestionListResponse = useRecoilValue(userQuestionSelector({
    userIdx,
    userPostTab,
  }));

  const splitedQuestionList: IQuestion[][] = useMemo(() => {
    return chunkArray(userQuestionList, CHUNK_POST_COUNT);
  }, [userQuestionList]);

  const onChangEUserQuestionTab = useCallback((userPostTab: EUserQuestion): void => {
    setUserPostTab(userPostTab);
    onChangeCurrentPage(1);
  }, [onChangeCurrentPage, setUserPostTab]);

  const requestUserPosts = useCallback((): void => {
    if (isNullOrUndefined(userQuestionResponse.data)) {
      return;
    }

    const { posts } = userQuestionResponse.data;
    setUserQuestionList(posts);
    setTotalPage(posts.length / CHUNK_POST_COUNT);
  }, [setTotalPage, setUserQuestionList, userQuestionResponse]);

  return {
    onChangEUserQuestionTab,
    userPostTab,
    splitedQuestionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    requestUserPosts,
  };
}

export default useUserPost;