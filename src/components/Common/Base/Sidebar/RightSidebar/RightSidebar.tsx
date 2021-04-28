import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PopularPost from './PopularPost';
import SidePopularUsers from './SidePopularUsers';

const style = require('./RightSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RightSidebar = (): JSX.Element => {
  return (
    <div className={cx('RightSidebar')}>
      <div className={cx('RightSidebar-Menus')}>
        <PopularPost />
        <SidePopularUsers />
      </div>
    </div>
  );
};

export default memo(RightSidebar);