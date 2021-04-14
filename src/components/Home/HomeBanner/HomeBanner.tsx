import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import VelogBanner from 'assets/images/banners/Velog.png';
import Sample from 'assets/images/sample.png';
import Carousel from 'components/Common/Carousel';

const style = require('./HomeBanner.scss');
const cx: ClassNamesFn = classNames.bind(style);

const images: string[] = [
  VelogBanner,
  Sample,
];

const HomeBanner = (): JSX.Element => {
  return (
    <div className={cx('HomeBanner')}>
      <Carousel images={images} />
    </div>
  );
};

export default HomeBanner;
