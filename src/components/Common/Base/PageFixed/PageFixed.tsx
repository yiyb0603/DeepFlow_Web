import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ToggleTheme from './ToggleTheme';
import ScrollToTop from './ScrollToTop';
import useScrollToTop from 'hooks/scroll/useScrollToTop';

const style = require('./PageFixed.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PageFixed = (): JSX.Element => {
  const { isBothSide, scrollToTop } = useScrollToTop();

  if (isBothSide) {
    return <></>;
  }

  return (
    <div className={cx('PageFixed')}>
      <ToggleTheme />
      <ScrollToTop scrollToTop={scrollToTop} />
    </div>
  );
};

export default PageFixed;
