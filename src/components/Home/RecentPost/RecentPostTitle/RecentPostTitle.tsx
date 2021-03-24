import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./RecentPostTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecentPostTitle = (): JSX.Element => {
  return (
    <div className={cx('RecentPostTitle')}>
      최근 올라온 질문글
    </div>
  );
};

export default RecentPostTitle;
