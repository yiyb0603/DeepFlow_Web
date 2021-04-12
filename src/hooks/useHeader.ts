import { useState, useCallback, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import useMyInfo from './useMyInfo';
import { removeCookie } from 'lib/Cookie';
import { successToast } from 'lib/Toast';

const useHeader = () => {
  const history: History = useHistory();
  const { myInfo, setMyInfo } = useMyInfo();
  
  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(true);
  const [currentScrollY, setCurrentScrollY] = useState<number>(0);

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

  const handleScrollToggle = useCallback((e) => {
    const { scrollY } = e.currentTarget;

    setIsScrollToTop(currentScrollY >= scrollY);
    setCurrentScrollY(scrollY);
  }, [currentScrollY]);

  useEffect(() => {
    setCurrentScrollY(window.scrollY);
    window.addEventListener('scroll', handleScrollToggle, true);

    return () => window.removeEventListener('scroll', handleScrollToggle, true);
  }, [handleScrollToggle]);

  return {
    myInfo,
    handleLogout,
    isScrollToTop,
  };
}

export default useHeader;