import { useEffect } from 'react';
import UserInfo from 'components/UserInfo';
import useUserInfo from 'hooks/useUserInfo';

const UserContainer = (): JSX.Element => {
  const { userInfo, setUserInfo } = useUserInfo();

  useEffect(() => {
    return () => {
      setUserInfo(null);
    }
  }, [setUserInfo]);

  return (
    <>
    {
      userInfo === null ? <></> :
      <UserInfo
        userInfo={userInfo}
      />
    }
    </>
  );
}

export default UserContainer;