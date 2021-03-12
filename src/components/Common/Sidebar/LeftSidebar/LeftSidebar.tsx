import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import LeftSidebarItem from './LeftSidebarItem';
import { ISideItemsType, sideItems } from 'lib/models/SideItems';

const style = require('./LeftSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const LeftSidebar = (): JSX.Element => {
  return (
    <div className={cx('LeftSidebar')}>
      <div className={cx('LeftSidebar-Menus')}>
        <div className={cx('LeftSidebar-Menus-Wrapper')}>
          {
            sideItems.map((item: ISideItemsType, idx: number) => {
              const { link, menuName, icon } = item;
              return (
                <LeftSidebarItem
                  key={idx}
                  link={link}
                  menuName={menuName}
                  icon={icon}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
