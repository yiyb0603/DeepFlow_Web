import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PopularPost from './PopularPost';
import PopularUser from './PopularUser';

const style = require('./RightSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RightSidebar = (): JSX.Element => {
  return (
    <div className={cx('RightSidebar')}>
      <PopularPost />
      <PopularUser />
    </div>
  );
};

export default RightSidebar;
