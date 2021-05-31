import { useCallback } from 'react';
import useMyInfo from 'hooks/user/useMyInfo';
import usePopularUsers from 'hooks/user/usePopularUsers';
import useRecentUsers from 'hooks/user/useRecentUsers';
import useUserList from 'hooks/user/useUserList';
import useUserInfo from 'hooks/user/useUserInfo';

const useUserCallback = () => {
  const { requestMyInfoCallback } = useMyInfo();
  const { requestUserInfoCallback } = useUserInfo();
  const { popularUsersCallback } = usePopularUsers();
  const { requestRecentUsersCallback } = useRecentUsers();
  const { requestUserListCallback } = useUserList();

  const requestUserCallback = useCallback((): void => {
    requestMyInfoCallback();
    requestUserInfoCallback();
    popularUsersCallback();
    requestRecentUsersCallback();
    requestUserListCallback();
  }, [popularUsersCallback, requestMyInfoCallback, requestRecentUsersCallback, requestUserInfoCallback, requestUserListCallback]);

  return {
    requestUserCallback,
  };
}

export default useUserCallback;