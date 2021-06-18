import { useCallback, MouseEvent, useEffect } from 'react';
import { TOKEN_KEY } from 'config/config.json';
import { historySingleton } from 'lib/singleton/history';
import Cookie from 'lib/Cookie';
import Toast from 'lib/Toast';
import useMyInfo from 'hooks/user/useMyInfo';

const useHeader = () => {
  const { myInfo, setMyInfo, requestMyInfo } = useMyInfo();

  const handleLogout = useCallback((e: MouseEvent<HTMLHyperlinkElementUtils>): void => {
    if (myInfo) {
      e.preventDefault();
      e.stopPropagation();
      setMyInfo(null);
      Cookie.removeCookie(TOKEN_KEY);
      Toast.successToast('로그아웃 되었습니다.');
      historySingleton.push('/');
    }
  }, [myInfo, setMyInfo]);

  useEffect(() => {
    requestMyInfo();
  }, [requestMyInfo]);

  return {
    myInfo,
    handleLogout,
  };
}

export default useHeader;