import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./LeftSidebarItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LeftSidebarItemProps {
  icon: JSX.Element;
  menuName: string;
  link: string;
}

const SidebarItem = ({ icon, menuName, link }: LeftSidebarItemProps): JSX.Element => {
  return (
    <div className={cx('LeftSidebarItem')}>
      {icon}
      <div className={cx('LeftSidebarItem-MenuName')}>{menuName}</div>
    </div>
  );
};

export default SidebarItem;
