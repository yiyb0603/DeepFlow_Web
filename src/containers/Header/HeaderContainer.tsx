import { useCallback, MouseEvent, memo } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import useMyInfo from 'hooks/useMyInfo';
import { CLIENT_ID, REDIRECT_URL } from 'config/config.json';
import { removeCookie } from 'lib/Cookie';
import { successToast } from 'lib/Toast';
import Header from 'components/Common/Header';

const HeaderContainer = (): JSX.Element => {
  const authUrl: string = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
  const history: History<unknown> = useHistory();
  const { myInfo, setMyInfo } = useMyInfo();

  const handleLogout = useCallback((e: MouseEvent<HTMLHyperlinkElementUtils>): void => {
    if (myInfo) {
      e.preventDefault();
      e.stopPropagation();
      setMyInfo(null);
      removeCookie('access_token');
      successToast('로그아웃 되었습니다.');
      history.push('/');
    }
  }, [history, myInfo, setMyInfo]);

  return (
    <Header
      authUrl={authUrl}
      myInfo={myInfo}
      handleLogout={handleLogout}
    />
  );
};

export default memo(HeaderContainer);