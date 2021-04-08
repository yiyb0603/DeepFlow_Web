import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ISideItemsType, sideItems } from 'lib/models/sideItems';
import MobileSidebarItem from './MobileSidebarItem';

const style = require('./MobileSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const MobileSidebar = (): JSX.Element => {
  return (
    <div className={cx('MobileSidebar')}>
      {
        sideItems.map((item: ISideItemsType, idx: number) => {
          const { link, menuName, icon } = item;
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
