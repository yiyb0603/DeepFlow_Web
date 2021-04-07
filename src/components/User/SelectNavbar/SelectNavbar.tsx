import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SelectNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SelectNavbar = (): JSX.Element => {
  return (
    <div className={cx('SelectNavbar')}>
      <div className={cx('SelectNavbar-Item')}>프로필</div>
      <div className={cx('SelectNavbar-Item')}>추천 목록</div>
    </div>
  );
};

export default SelectNavbar;
