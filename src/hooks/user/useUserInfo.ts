import { useState, useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState, userPostState } from 'atom/user';
import { CHUNK_POST_COUNT } from 'constants/util';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getUserPosts } from 'lib/api/question/question.api';
import { EUserPost } from 'lib/enum/post';
import { IUser } from 'types/user.types';
import { IQuestion } from 'types/question.types';
import usePageParam from '../util/usePageParam';
import { chunkArray } from 'util/chunkArray';
import useTabState from 'hooks/util/useTabState';
import usePagination from 'hooks/util/usePagination';

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
  const [userPostTab, setUserPostTab] = useTabState<EUserPost>('tab', EUserPost.WRITED);

  const [userPostList, setUserPostList] = useRecoilState<IQuestion[]>(userPostState);
  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);

  const splitedPostList: IQuestion[][] = useMemo(() => {
    return chunkArray(userPostList, CHUNK_POST_COUNT);
  }, [userPostList]);

  const onChangeUserPostTab = useCallback((userPostTab: EUserPost): void => {
    setUserPostTab(userPostTab);
    onChangeCurrentPage(1);
  }, [onChangeCurrentPage, setUserPostTab]);

  const requestUserInfo = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { user } } = await getUserInfo(userIdx);

      if (status === EResponse.OK) {
        setUserInfo(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserInfo, userIdx]);

  const requestUserPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { posts } } = await getUserPosts(userIdx, userPostTab);

      if (status === EResponse.OK) {
        setUserPostList(posts);
        setTotalPage(posts.length / CHUNK_POST_COUNT);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setTotalPage, setUserPostList, userIdx, userPostTab]);

  const renderUserInfo = useCallback(async (): Promise<void> => {
    if (Number.isInteger(userIdx)) {
      setIsLoading(true);
      
      await requestUserInfo();
      await requestUserPosts();
      
      setIsLoading(false);
    }
  }, [requestUserInfo, requestUserPosts, userIdx]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
    onChangeUserPostTab,
    userPostTab,
    renderUserInfo,
    requestUserInfo,
    splitedPostList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  };
}

export default useUserInfo;