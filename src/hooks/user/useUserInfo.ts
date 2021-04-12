import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { userInfoState, userPostState } from 'atom/user';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import usePageParam from '../util/usePageParam';
import { IUser } from 'types/user.types';
import { getUserPosts } from 'lib/api/post/post.api';
import useQueryString from '../util/useQueryString';
import { EUserPost } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import { chunkArray } from 'util/chunkArray';
import { CHUNK_COUNT } from 'constants/user';

const useUserInfo = () => {
  const userIdx: number = usePageParam();
  const { tab } = useQueryString();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPostTab, setUserPostTab] = useState<EUserPost>(Number(tab) || EUserPost.WRITED);

  const [userPostList, setUserPostList] = useRecoilState<IPost[]>(userPostState);
  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);

  const history: History = useHistory();
  const [page, setPage] = useState<number>(1);
  const splitedPostList: IPost[][] = useMemo(() => chunkArray(userPostList, CHUNK_COUNT), [userPostList]);

  const onChangeUserPostTab = useCallback((userPostTab: EUserPost): void => {
    history.push(`?tab=${userPostTab}`);
    setPage(1);
    setUserPostTab(userPostTab);
  }, [history, setUserPostTab]);

  const handlePrevPage = useCallback((): void => {
    if (page === 1) {
      setPage(splitedPostList.length);
      return;
    }

    setPage((prevPage: number) => prevPage - 1);
  }, [page, splitedPostList.length]);

  const handleNextPage = useCallback((): void => {
    if (page === splitedPostList.length) {
      setPage(1);
      return;
    }

    setPage((prevPage: number) => prevPage + 1);
  }, [page, splitedPostList]);

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
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserPostList, userIdx, userPostTab]);

  const renderUserInfo = useCallback(async (): Promise<void> => {
    if (Number.isInteger(userIdx)) {
      setIsLoading(true);
      
      await requestUserInfo();
      await requestUserPosts();
      
      setIsLoading(false);
    }
  }, [requestUserInfo, requestUserPosts, userIdx]);

  useEffect(() => {
    renderUserInfo();
  }, [renderUserInfo]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
    userPostList,
    onChangeUserPostTab,
    handlePrevPage,
    handleNextPage,
    userPostTab,
    setUserPostTab,
    requestUserInfo,
    renderUserInfo,
    page,
    splitedPostList,
  };
}

export default useUserInfo;