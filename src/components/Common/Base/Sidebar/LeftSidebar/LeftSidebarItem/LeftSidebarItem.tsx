import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import usePathName from 'hooks/util/usePathName';

const style = require('./LeftSidebarItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LeftSidebarItemProps {
  icon: JSX.Element;
  menuName: string;
  link: string;
}

const LeftSidebarItem = ({
  icon,
  menuName,
  link,
}: LeftSidebarItemProps): JSX.Element => {
  const pathname: string = usePathName();

  return (
    <Link
      to={link}
      className={cx('LeftSidebarItem', {
        'LeftSidebarItem-Current': pathname === link,
      })}
    >
      {icon}
      <div className={cx('LeftSidebarItem-MenuName')}>{menuName}</div>
    </Link>
  );
};

export default LeftSidebarItem;
