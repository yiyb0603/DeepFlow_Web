import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { popularUserListState } from 'atom/user';
import { getPopularUserList } from 'lib/api/user/user.api';
import { POPULAR_USER_COUNT } from 'constants/user';
import { EResponse } from 'lib/enum/response';
import { IUser } from 'types/user.types';

const usePopularUsers = () => {
  const [popularUsers, setPopularUsers] = useRecoilState<IUser[]>(popularUserListState);

  const requestPopularUsers = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getPopularUserList(POPULAR_USER_COUNT);

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
  };
}

export default usePopularUsers;