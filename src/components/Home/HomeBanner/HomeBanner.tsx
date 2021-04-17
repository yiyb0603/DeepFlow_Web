import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Carousel from 'components/Common/Carousel';
import { banners } from 'lib/models/banners';

const style = require('./HomeBanner.scss');
const cx: ClassNamesFn = classNames.bind(style);

const HomeBanner = (): JSX.Element => {
  return (
    <div className={cx('HomeBanner')}>
      <Carousel banners={banners} />
    </div>
  );
};

export default HomeBanner;
