import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popularUserListState, userSearchKeywordState } from 'atom/user';
import { EResponse } from 'lib/enum/response';
import { IUser } from 'types/user.types';
import { EUserSort } from 'lib/enum/user';
import { getUserList } from 'lib/api/user/user.api';

const usePopularUsers = () => {
  const keyword: string = useRecoilValue<string>(userSearchKeywordState);
  const [popularUsers, setPopularUsers] = useRecoilState<IUser[]>(popularUserListState);

  const filteredUsers: IUser[] = useMemo(() => {
    return popularUsers.filter((user: IUser) => user.name.includes(keyword));
  }, [keyword, popularUsers]);

  const requestPopularUsers = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.POPULAR);

      if (status === EResponse.OK) {
        setPopularUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularUsers]);

  useEffect(() => {
    requestPopularUsers();
  }, [requestPopularUsers]);

  return {
    popularUsers,
    filteredUsers,
  };
}

export default usePopularUsers;