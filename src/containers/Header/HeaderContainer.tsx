import { useCallback, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import { getUserInfoState } from 'selector/user';
import Header from 'components/Common/Header';
import { CLIENT_ID, REDIRECT_URL } from 'config/config.json';
import { removeCookie } from 'lib/Cookie';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { successToast } from 'lib/Toast';

const HeaderContainer = (): JSX.Element => {
  const authUrl: string = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
  const myToken: IToken = getMyInfo() || null;

  const [myInfo, setMyInfo] = useRecoilState(getUserInfoState(myToken ? myToken.idx : null));

  const handleLogout = useCallback((e: MouseEvent<HTMLHyperlinkElementUtils>): void => {
    if (myToken) {
      e.preventDefault();
      e.stopPropagation();
      setMyInfo(null);
      removeCookie('accessToken');
      successToast('로그아웃 되었습니다.');
    }
  }, [myToken, setMyInfo]);

  return (
    <Header
      authUrl={authUrl}
      myInfo={myInfo}
      handleLogout={handleLogout}
    />
  );
};

export default HeaderContainer;