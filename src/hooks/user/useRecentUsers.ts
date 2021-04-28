import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { EUserSort } from 'lib/enum/user';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from 'types/user.types';

const useRecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState<IUser[]>([]);

  const requestRecentUsers = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.GENERATION);

      if (status === EResponse.OK) {
        const sortedByJoinedAt: IUser[] = users.sort((a, b) => {
          return Date.parse(String(b.joinedAt)) - Date.parse(String(a.joinedAt));
        });

        setRecentUsers(sortedByJoinedAt.length > 3 ? sortedByJoinedAt.slice(0, 3) : sortedByJoinedAt);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    requestRecentUsers();
  }, [requestRecentUsers]);

  return {
    recentUsers,
  };
}

export default useRecentUsers;