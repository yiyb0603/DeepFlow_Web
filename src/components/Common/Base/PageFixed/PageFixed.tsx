import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ToggleTheme from './ToggleTheme';
import ScrollToTop from './ScrollToTop';

const style = require('./PageFixed.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PageFixed = (): JSX.Element => {
  return (
    <div className={cx('PageFixed')}>
      <ToggleTheme />
      <ScrollToTop />
    </div>
  );
};

export default PageFixed;
