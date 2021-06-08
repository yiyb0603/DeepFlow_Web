import { useRef, useCallback, useEffect, useState } from 'react';

const useSideToggleMenu = () => {
  const sideRef = useRef<HTMLDivElement>(null);
  const [isSideShow, setIsSideShow] = useState<boolean>(false);

  const toggleIsSideShow = useCallback((): void => {
    setIsSideShow((prevIsSideShow: boolean) => !prevIsSideShow);
  }, []);

  const handleClickOut = useCallback((e): void => {
    if (sideRef.current && !sideRef.current.contains(e.target)){
      setIsSideShow(false);
    }
  }, [setIsSideShow]);

  useEffect(() => {
    if (isSideShow) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOut, true);

      return () => {
        document.body.style.overflow = 'visible';
        document.removeEventListener('click', handleClickOut, true);
      }
    }
  }, [handleClickOut, isSideShow]);

  return {
    sideRef,
    isSideShow,
    toggleIsSideShow,
  };
};

export default useSideToggleMenu;