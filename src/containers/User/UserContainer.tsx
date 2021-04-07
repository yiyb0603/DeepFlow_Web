import { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { chunkArray } from 'util/chunkArray';
import useUserInfo from 'hooks/useUserInfo';
import { IPost } from 'types/post.types';
import { CHUNK_COUNT } from 'constants/user';
import { EUserPost } from 'lib/enum/post';
import { groupingState } from 'converter/groupingState';
import UserInfo from 'components/User/UserInfo';
import UserLoading from 'components/UserList/UserLoading';

const UserContainer = (): JSX.Element => {
  const {
    isLoading,
    userInfo,
    userPostList,
    userPostTab,
    setUserPostTab,
    renderUserInfo,
  } = useUserInfo();

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

  useEffect(() => {
    renderUserInfo();
  }, [renderUserInfo]);

  return (
    <>
    {
      isLoading ? <UserLoading /> :
      <UserInfo
        userInfo={userInfo!}
        userPostTabState={groupingState('userPostTab', userPostTab, onChangeUserPostTab)}
        page={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        splitedPostList={splitedPostList}
      />
    }
    </>
  );
}

export default UserContainer;