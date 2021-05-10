import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import usePathName from 'hooks/util/usePathName';

const style = require('./MobileSidebarItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MobileSidebarItemProps {
  link: string;
  menuName: string;
  icon: JSX.Element;
}

const MobileSidebarItem = ({
  link,
  menuName,
  icon,
}: MobileSidebarItemProps) => {
  const pathname: string = usePathName();

  return (
    <Link
      to={link}
      className={cx('MobileSidebarItem', {
        'MobileSidebarItem-Current': pathname === link,
      })}
    >
      {icon}
      <div className={cx('MobileSidebarItem-MenuName')}>{menuName}</div>
    </Link>
  );
};

export default MobileSidebarItem;
