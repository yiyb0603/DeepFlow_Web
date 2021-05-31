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
import { getUserPosts } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';

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
  const userQuestionResponse: IQuestionListResponse | null = useRecoilValue(userQuestionSelector({
    userIdx: userIdx || null,
    userPostTab,
  }));

  const splitedQuestionList: IQuestion[][] = useMemo(() => {
    return chunkArray(userQuestionList, CHUNK_POST_COUNT);
  }, [userQuestionList]);

  const onChangeUserQuestionTab = useCallback((userPostTab: EUserQuestion): void => {
    setUserPostTab(userPostTab);
    onChangeCurrentPage(1);
  }, [onChangeCurrentPage, setUserPostTab]);

  const requestUserPosts = useCallback((): void => {
    if (isNullOrUndefined(userQuestionResponse)) {
      return;
    }

    const { posts } = userQuestionResponse?.data!;
    setUserQuestionList(posts);
    setTotalPage(posts.length / CHUNK_POST_COUNT);
  }, [setTotalPage, setUserQuestionList, userQuestionResponse]);

  const requestUserPostsCallback = useCallback(async (): Promise<void> => {
    if (!Number.isInteger(userIdx)) {
      return;
    }

    try {
      const { status, data: { posts } } = await getUserPosts(userIdx, userPostTab);

      if (status === EResponse.OK) {
        setUserQuestionList(posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserQuestionList, userIdx, userPostTab]);

  return {
    onChangeUserQuestionTab,
    userPostTab,
    splitedQuestionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    requestUserPosts,
    requestUserPostsCallback,
  };
}

export default useUserPost;