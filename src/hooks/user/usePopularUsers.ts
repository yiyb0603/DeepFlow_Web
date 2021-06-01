import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userSearchKeywordState } from 'lib/recoil/atom/user';
import { popularUserListState, popularUserMountedState } from 'lib/recoil/atom/user/popularUser';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { EUserSort } from 'lib/enum/user';
import { userListSelector } from 'lib/recoil/selector/user';
import { IUser } from 'types/user.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const usePopularUsers = () => {
  const keyword: string = useRecoilValue<string>(userSearchKeywordState);
  const [popularUserMounted, setPopularUserMounted] = useRecoilState(popularUserMountedState);
  const [popularUsers, setPopularUsers] = useRecoilState<IUser[]>(popularUserListState);

  const userListResponse: IUser[] = useRecoilValue(userListSelector(EUserSort.POPULAR));

  const filteredUsers: IUser[] = useMemo(() => {
    return popularUsers.filter((user: IUser) => user.name.includes(keyword));
  }, [keyword, popularUsers]);

  const requestPopularUsers = useCallback((): void => {
    if (isNullOrUndefined(userListResponse) || popularUserMounted) {
      return;
    }

    setPopularUsers(userListResponse.slice(0, 3));
  }, [popularUserMounted, setPopularUsers, userListResponse]);

  const popularUsersCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(EUserSort.POPULAR);

      if (status === EResponse.OK) {
        setPopularUsers(users.slice(0, 3));
        setPopularUserMounted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularUserMounted, setPopularUsers]);

  return {
    popularUsers,
    filteredUsers,
    requestPopularUsers,
    popularUsersCallback,
  };
}

export default usePopularUsers;