import { useEffect } from 'react';
import UserInfo from 'components/UserInfo';
import useUserInfo from 'hooks/useUserInfo';
import UserLoading from 'components/UserList/UserLoading';

const UserContainer = (): JSX.Element => {
  const { isLoading, userInfo, setUserInfo } = useUserInfo();

  useEffect(() => {
    return () => setUserInfo(null);
  }, [setUserInfo]);

  return (
    <>
    {
      userInfo === null && isLoading ? <UserLoading /> :
      <UserInfo
        userInfo={userInfo!}
      />
    }
    </>
  );
}

export default UserContainer;