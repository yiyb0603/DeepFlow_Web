import { useState, useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState, userQuestionState } from 'lib/recoil/atom/user';
import { CHUNK_POST_COUNT } from 'constants/util';
import { EUserQuestion } from 'lib/enum/question';
import useTabState from 'hooks/util/useTabState';
import usePagination from 'hooks/util/usePagination';
import { userInfoSelector, userQuestionSelector } from 'lib/recoil/selector/user';
import isNullOrUndefined from 'util/isNullOrUndefined';
import { IUser, IUserResponse } from 'types/user.types';
import { IQuestion, IQuestionListResponse } from 'types/question.types';
import usePageParam from '../util/usePageParam';
import chunkArray from 'util/chunkArray';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import UserError from 'error/UserError';

const useUserInfo = () => {
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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPostTab, setUserPostTab] = useTabState<EUserQuestion>('tab', EUserQuestion.WRITED);

  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);
  const [userQuestionList, setUserQuestionList] = useRecoilState<IQuestion[]>(userQuestionState);

  const userResponse: IUserResponse | null = useRecoilValue(userInfoSelector(userIdx));
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

  const requestUserInfo = useCallback((): void => {
    if (isNullOrUndefined(userResponse!.data)) {
      return;
    }

    const { user } = userResponse!.data;
    setUserInfo(user);
  }, [setUserInfo, userResponse]);

  const requestUserInfoCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { user } } = await getUserInfo(userIdx);

      if (status === EResponse.OK) {
        setUserInfo(user);
      }
    } catch (error) {
      new UserError(error).getUserError();
    }
  }, [setUserInfo, userIdx]);

  const requestUserPosts = useCallback((): void => {
    if (isNullOrUndefined(userQuestionResponse.data)) {
      return;
    }

    const { posts } = userQuestionResponse.data;
    setUserQuestionList(posts);
    setTotalPage(posts.length / CHUNK_POST_COUNT);
  }, [setTotalPage, setUserQuestionList, userQuestionResponse]);

  const renderUserInfo = useCallback((): void => {
    if (Number.isInteger(userIdx)) {
      setIsLoading(true);
      
      requestUserInfo();
      requestUserPosts();
      
      setIsLoading(false);
    }
  }, [requestUserInfo, requestUserPosts, userIdx]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
    onChangEUserQuestionTab,
    userPostTab,
    renderUserInfo,
    requestUserInfo,
    requestUserInfoCallback,
    splitedQuestionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  };
}

export default useUserInfo;