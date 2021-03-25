import { CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router';
import { History } from 'history';
import { palette } from 'styles/Palette/Palette';
import usePathName from 'hooks/util/usePathName';

const style = require('./LeftSidebarItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LeftSidebarItemProps {
  icon: JSX.Element;
  menuName: string;
  link: string;
}

const SidebarItem = ({ icon, menuName, link }: LeftSidebarItemProps): JSX.Element => {
  const history: History<unknown> = useHistory();
  const pathname: string = usePathName();

  const sameLinkStyle: CSSProperties = {
    backgroundColor: palette.lighterGray,
  };

  return (
    <div
      style={pathname === link ? sameLinkStyle : {}}
      className={cx('LeftSidebarItem')}
      onClick={() => history.push(link)}
    >
      {icon}
      <div className={cx('LeftSidebarItem-MenuName', {
        'LeftSidebarItem-SameMenu': pathname === link,
      })}>{menuName}</div>
    </div>
  );
};

export default SidebarItem;
