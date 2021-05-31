import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { EUserSort } from 'lib/enum/user';
import { recentUserListState, recentUserMountedState } from 'lib/recoil/atom/user/recentUser';
import { userListSelector } from 'lib/recoil/selector/user';
import { IUser, IUserListResponse } from 'types/user.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useRecentUsers = () => {
  const [recentUserMounted, setRecentUserMounted] = useRecoilState<boolean>(recentUserMountedState);
  const [recentUsers, setRecentUsers] = useRecoilState<IUser[]>(recentUserListState);
  const userListResponse: IUserListResponse = useRecoilValue(userListSelector(EUserSort.GENERATION));

  const handleSortByJoinedAt = useCallback((users: IUser[]): void => {
    const sortedByJoinedAt: IUser[] = users.slice().sort((a, b) => {
      return Date.parse(String(b.joinedAt)) - Date.parse(String(a.joinedAt));
    });

    setRecentUsers(sortedByJoinedAt.length > 3 ? sortedByJoinedAt.slice(0, 3) : sortedByJoinedAt);
  }, [setRecentUsers]);

  const requestRecentUsers = useCallback((): void => {
    if (isNullOrUndefined(userListResponse.data) || recentUserMounted) {
      return;
    }

    const { users } = userListResponse.data;
    handleSortByJoinedAt(users);
  }, [handleSortByJoinedAt, recentUserMounted, userListResponse.data]);

  const requestRecentUsersCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.GENERATION);

      if (status === EResponse.OK) {
        handleSortByJoinedAt(users);
        setRecentUserMounted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleSortByJoinedAt, setRecentUserMounted]);

  return {
    recentUsers,
    requestRecentUsers,
    requestRecentUsersCallback,
  };
}

export default useRecentUsers;