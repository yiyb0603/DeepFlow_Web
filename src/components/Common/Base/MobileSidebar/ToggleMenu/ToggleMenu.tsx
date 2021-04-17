import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { FiMenu } from 'react-icons/fi';
import MobileSidebar from '../MobileSidebar';

const style = require('./ToggleMenu.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ToggleMenuProps {
  isSideShow: boolean;
  setIsSideShow: Dispatch<SetStateAction<boolean>>;
}

const ToggleMenu = ({
  isSideShow,
  setIsSideShow,
}: ToggleMenuProps): JSX.Element => {
  const sideRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className={cx('ToggleMenu')} ref={sideRef}>
      <FiMenu className={cx('ToggleMenu-Menu')} onClick={() => setIsSideShow(!isSideShow)} />
      {
        isSideShow &&
        <MobileSidebar />
      }
    </div>
  );
};

export default ToggleMenu;
