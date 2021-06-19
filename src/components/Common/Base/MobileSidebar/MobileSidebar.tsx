import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ISideItem, sideItems } from 'lib/models/menu/sideItems';
import MobileSidebarItem from './MobileSidebarItem';

const style = require('./MobileSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const MobileSidebar = (): JSX.Element => {
  return (
    <div className={cx('MobileSidebar')}>
      {
        sideItems.map((item: ISideItem) => {
          const { idx, link, menuName, icon } = item;
          return (
            <MobileSidebarItem
              key={idx}
              link={link}
              menuName={menuName}
              icon={icon}
            />
          );
        })
      }
    </div>
  );
};

export default MobileSidebar;
