import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoticeCategory.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NoticeCategory = (): JSX.Element => {
  return (
    <div className={cx('NoticeCategory')}>
      <div>알림</div>
    </div>
  );
};

export default NoticeCategory;
