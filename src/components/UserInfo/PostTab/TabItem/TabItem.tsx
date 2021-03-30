import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { PostTabProps } from '../PostTab';

const style = require('./TabItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TabItemProps extends PostTabProps {
  name: string;
  route: string;
}

const TabItem = ({ name, route, userPostTab, onChangeUserPostTab }: TabItemProps): JSX.Element => {
  const splitedRouteTab: number = Number(route.split("=")[1]);

  return (
    <div className={cx('TabItem', {
      'TabItem-Current': userPostTab === splitedRouteTab,
    })} onClick={() => onChangeUserPostTab(splitedRouteTab)}>{name}</div>
  );
};

export default TabItem;
