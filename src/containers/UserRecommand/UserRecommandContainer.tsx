import { useEffect } from 'react';
import UserRecommand from 'components/User/UserRecommand';
import useRecommand from 'hooks/useRecommand';

const UserRecommandContainer = (): JSX.Element => {
  const { userRecommands, requestRecommandList, requestDeleteRecommand } = useRecommand();

  useEffect(() => {
    requestRecommandList();
  }, [requestRecommandList]);

  return (
    <UserRecommand
      userRecommands={userRecommands}
      requestDeleteRecommand={requestDeleteRecommand}
    />
  );
}

export default UserRecommandContainer;