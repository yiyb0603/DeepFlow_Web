import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./FallbackLoader.scss');
const cx: ClassNamesFn = classNames.bind(style);

const FallbackLoader = (): JSX.Element => {
  return (
    <div className={cx('FallbackLoader')}>
      <div className={cx('FallbackLoader-Header')}></div>

      <div className={cx('FallbackLoader-ContentsWrap')}>
        <div className={cx('FallbackLoader-ContentsWrap-LeftSidebar')}>sd</div>
        <div className={cx('FallbackLoader-ContentsWrap-Center')}></div>
        <div className={cx('FallbackLoader-ContentsWrap-RightSidebar')}></div>
      </div>
    </div>
  );
}

export default FallbackLoader;