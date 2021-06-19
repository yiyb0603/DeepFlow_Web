import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ISideItem, sideItems } from 'lib/models/menu/sideItems';
import { Fragment } from 'react';
import { getMyInfo } from 'util/getMyInfo';
import LeftSidebarItem from './LeftSidebarItem';

const style = require('./LeftSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const LeftSidebar = (): JSX.Element => {
  return (
    <div className={cx('LeftSidebar')}>
      <div className={cx('LeftSidebar-Menus')}>
        <div className={cx('LeftSidebar-Menus-Wrapper')}>
          {
            sideItems.map((item: ISideItem) => {
              const { idx, menuName, icon, link, mustToken } = item;

              return (
                <Fragment key={idx}>
                {
                  (!mustToken || getMyInfo()) &&
                  <LeftSidebarItem
                    menuName={menuName}
                    icon={icon}
                    link={link}
                  />
                }
                </Fragment>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
