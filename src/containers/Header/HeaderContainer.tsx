import Header from 'components/Common/Header';
import { CLIENT_ID, REDIRECT_URL } from 'config/config.json';

const HeaderContainer = (): JSX.Element => {
  const authUrl: string = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

  return (
    <Header
      authUrl={authUrl}
    />
  );
};

export default HeaderContainer;