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
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUserInfo, userIdx]);

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
  
  useEffect(() => {
    if (Number.isInteger(userIdx)) {
      requestUserInfo();
      requestUserPosts();
    }
  }, [requestUserInfo, requestUserPosts, userIdx, userPostTab]);

  return {
    isLoading,
    userInfo,
    setUserInfo,
    userPostList,
    userPostTab,
    setUserPostTab,
  };
}

export default useUserInfo;