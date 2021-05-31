import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { EUserSort } from 'lib/enum/user';
import { userListSelector } from 'lib/recoil/selector/user';
import { IUser, IUserListResponse } from 'types/user.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useRecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState<IUser[]>([]);
  const userListResponse: IUserListResponse = useRecoilValue(userListSelector(EUserSort.GENERATION));

  const handleSortByJoinedAt = useCallback((users: IUser[]): void => {
    const sortedByJoinedAt: IUser[] = users.slice().sort((a, b) => {
      return Date.parse(String(b.joinedAt)) - Date.parse(String(a.joinedAt));
    });

    setRecentUsers(sortedByJoinedAt.length > 3 ? sortedByJoinedAt.slice(0, 3) : sortedByJoinedAt);
  }, []);

  const requestRecentUsers = useCallback((): void => {
    if (isNullOrUndefined(userListResponse.data)) {
      return;
    }

    const { users } = userListResponse.data;
    handleSortByJoinedAt(users);
  }, [handleSortByJoinedAt, userListResponse]);

  const requestRecentUsersCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.GENERATION);

      if (status === EResponse.OK) {
        handleSortByJoinedAt(users);
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleSortByJoinedAt]);

  return {
    recentUsers,
    requestRecentUsers,
    requestRecentUsersCallback,
  };
}

export default useRecentUsers;