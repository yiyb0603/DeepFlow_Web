import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_SERIES_LINK } from 'constants/link';
import { APP_NAME } from 'constants/util';
import pushToWindowLink from 'util/pushToWindowLink';

const style = require('./FooterTextZone.scss');
const cx: ClassNamesFn = classNames.bind(style);

const FooterTextZone = (): JSX.Element => {
  return (
    <div className={cx('FooterTextZone')}>
      <div className={cx('FooterTextZone-TopContents')}>
        <b>{APP_NAME}</b>는 대구소프트웨어마이스터고등학교 교내 StackOverflow 서비스 입니다.
      </div>

      <div className={cx('FooterTextZone-Copyright')}>
        Copyright yiyb0603. All right reserved. Since 2021
      </div>

      <span
        className={cx('FooterTextZone-Series')}
        onClick={() => pushToWindowLink(APP_SERIES_LINK)}
      >
        시리즈
      </span>
    </div>
  );
};

export default FooterTextZone;
