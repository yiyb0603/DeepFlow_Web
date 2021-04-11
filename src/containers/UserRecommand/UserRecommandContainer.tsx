import useRecommand from 'hooks/useRecommand';
import UserRecommand from 'components/User/UserRecommand';

const UserRecommandContainer = (): JSX.Element => {
  const {
    userInfo,
    userRecommands,
    requestDeleteRecommand,
  } = useRecommand();

  return (
    <>
    {
      userInfo === null ? <></>
      :
      <UserRecommand
        userInfo={userInfo!}
        userRecommands={userRecommands}
        requestDeleteRecommand={requestDeleteRecommand}
      />
    }
    </>
  );
}

export default UserRecommandContainer;