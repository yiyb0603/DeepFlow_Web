import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popularUserListState, userSearchKeywordState } from 'lib/recoil/atom/user';
import { IUser, IUserListResponse } from 'types/user.types';
import { EUserSort } from 'lib/enum/user';
import { userListSelector } from 'lib/recoil/selector/user';
import { isNullOrUndefined } from 'util/isNullOrUndefined';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';

const usePopularUsers = () => {
  const keyword: string = useRecoilValue<string>(userSearchKeywordState);
  const [popularUsers, setPopularUsers] = useRecoilState<IUser[]>(popularUserListState);

  const userListResponse: IUserListResponse = useRecoilValue(userListSelector(EUserSort.POPULAR));

  const filteredUsers: IUser[] = useMemo(() => {
    return popularUsers.filter((user: IUser) => user.name.includes(keyword));
  }, [keyword, popularUsers]);

  const requestPopularUsers = useCallback((): void => {
    if (!isNullOrUndefined(userListResponse)) {
      setPopularUsers(userListResponse.data.users.slice(0, 3));
    }
  }, [setPopularUsers, userListResponse]);

  const popularUsersCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.POPULAR);

      if (status === EResponse.OK) {
        setPopularUsers(users.slice(0, 3));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularUsers]);

  return {
    popularUsers,
    filteredUsers,
    requestPopularUsers,
    popularUsersCallback,
  };
}

export default usePopularUsers;