import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
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
  const history: History<unknown> = useHistory();
  const pathname: string = usePathName();

  return (
    <div
      className={cx('MobileSidebarItem', {
        'MobileSidebarItem-Current': pathname === link,
      })}
      onClick={() => history.push(link)}
    >
      {icon}
      <div className={cx('MobileSidebarItem-MenuName')}>{menuName}</div>
    </div>
  );
};

export default MobileSidebarItem;
