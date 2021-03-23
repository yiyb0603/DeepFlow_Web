import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./TopSection.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TopSection = (): JSX.Element => {
  return (
    <div className={cx('TopSection')}>
        <div className={cx('TopSection-TitleWrap')}>
          <div className={cx('TopSection-TitleWrap-Title')}>유저 목록</div>
          <div className={cx('TopSection-TitleWrap-SubTitle')}>가입한 유저 목록입니다.</div>
        </div>
      </div>
  );
};

export default TopSection;
