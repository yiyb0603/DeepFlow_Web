import { useCallback, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { removeCookie } from 'lib/Cookie';
import { successToast } from 'lib/Toast';
import useMyInfo from 'hooks/user/useMyInfo';

const useHeader = () => {
  const history: History = useHistory();
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

  return {
    myInfo,
    handleLogout,
  };
}

export default useHeader;