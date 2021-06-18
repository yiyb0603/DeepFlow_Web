import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { FiMenu } from 'react-icons/fi';
import useSideToggleMenu from 'hooks/common/sidebar/useSideToggleMenu';
import MobileSidebar from '../MobileSidebar';

const style = require('./ToggleMenu.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ToggleMenu = (): JSX.Element => {
  const {
    sideRef,
    isSideShow,
    toggleIsSideShow,
  } = useSideToggleMenu();

  return (
    <div
      className={cx('ToggleMenu')}
      ref={sideRef}
    >
      <FiMenu
        className={cx('ToggleMenu-Menu')}
        onClick={toggleIsSideShow}
      />
      {
        isSideShow &&
        <MobileSidebar />
      }
    </div>
  );
};

export default ToggleMenu;
