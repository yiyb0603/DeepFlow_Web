import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import usePathName from 'hooks/util/usePathName';

const style = require('./LeftSidebarItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LeftSidebarItemProps {
  icon: JSX.Element;
  menuName: string;
  link: string;
}

const LeftSidebarItem = ({ icon, menuName, link }: LeftSidebarItemProps): JSX.Element => {
  const history: History = useHistory();
  const pathname: string = usePathName();

  return (
    <div
      className={cx('LeftSidebarItem', {
        'LeftSidebarItem-Current': pathname === link,
      })}
      onClick={() => history.push(link)}
    >
      {icon}
      <div className={cx('LeftSidebarItem-MenuName')}>{menuName}</div>
    </div>
  );
};

export default LeftSidebarItem;
