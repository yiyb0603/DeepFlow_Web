import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ISideItemsType, sideItems } from 'lib/models/menu/sideItems';
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
            sideItems.map((item: ISideItemsType, idx: number) => {
              const { menuName, icon, link, mustToken } = item;

              return (
                <>
                {
                  (!mustToken || getMyInfo()) &&
                  <LeftSidebarItem
                    key={idx}
                    menuName={menuName}
                    icon={icon}
                    link={link}
                  />
                }
                </>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
