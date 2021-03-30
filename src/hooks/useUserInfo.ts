import { useState, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState, userPostState } from 'atom/user';
import { getUserInfo } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import usePageParam from './util/usePageParam';
import { IUser } from 'types/user.types';
import { getUserPosts } from 'lib/api/post/post.api';
import useQueryString from './util/useQueryString';
import { EUserPost } from 'lib/enum/post';
import { IPost } from 'types/post.types';

const useUserInfo = () => {
  const userIdx: number = usePageParam();
  const { tab } = useQueryString();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPostTab, setUserPostTab] = useState<EUserPost>(Number(tab) || EUserPost.WRITED);

  const [userPostList, setUserPostList] = useRecoilState<IPost[]>(userPostState);
  const [userInfo, setUserInfo] = useRecoilState<IUser | null>(userInfoState);

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

  return {
    isLoading,
    userInfo,
    setUserInfo,
    userPostList,
    userPostTab,
    setUserPostTab,
    renderUserInfo,
  };
}

export default useUserInfo;