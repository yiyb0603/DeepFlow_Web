import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { popularUserListState, userSearchKeywordState } from 'lib/recoil/atom/user';
import { IUser, IUserListResponse } from 'types/user.types';
import { EUserSort } from 'lib/enum/user';
import { userListSelector } from 'lib/recoil/selector/user';
import { isNullOrUndefined } from 'util/isNullOrUndefined';

const usePopularUsers = () => {
  const keyword: string = useRecoilValue<string>(userSearchKeywordState);
  const [popularUsers, setPopularUsers] = useRecoilState<IUser[]>(popularUserListState);

  const userListResponse: IUserListResponse = useRecoilValue(userListSelector(EUserSort.POPULAR));

  const filteredUsers: IUser[] = useMemo(() => {
    return popularUsers.filter((user: IUser) => user.name.includes(keyword));
  }, [keyword, popularUsers]);

  const requestPopularUsers = useCallback((): void => {
    if (!isNullOrUndefined(userListResponse)) {
      setPopularUsers(userListResponse.data.users);
    }
  }, [setPopularUsers, userListResponse]);

  useEffect(() => {
    requestPopularUsers();
  }, [requestPopularUsers]);

  return {
    popularUsers,
    filteredUsers,
  };
}

export default usePopularUsers;