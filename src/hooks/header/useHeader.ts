import { useCallback, MouseEvent } from 'react';
import { historySingleton } from 'lib/singleton/history';
import Cookie from 'lib/Cookie';
import Toast from 'lib/Toast';
import useMyInfo from 'hooks/user/useMyInfo';

const useHeader = () => {
  const { myInfo, setMyInfo } = useMyInfo();

  const handleLogout = useCallback((e: MouseEvent<HTMLHyperlinkElementUtils>): void => {
    if (myInfo) {
      e.preventDefault();
      e.stopPropagation();
      setMyInfo(null);
      Cookie.removeCookie('access_token');
      Toast.successToast('로그아웃 되었습니다.');
      historySingleton.push('/');
    }
  }, [myInfo, setMyInfo]);

  return {
    myInfo,
    handleLogout,
  };
}

export default useHeader;