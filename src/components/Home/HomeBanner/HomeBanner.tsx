import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import VelogBanner from 'assets/images/banners/Velog.png';
import DGSWCertificaion from 'assets/images/banners/DGSW_Certification.png';
import StackOverflow from 'assets/images/banners/StackOverflow.png';
import Carousel from 'components/Common/Carousel';

const style = require('./HomeBanner.scss');
const cx: ClassNamesFn = classNames.bind(style);

const images: string[] = [
  VelogBanner,
  StackOverflow,
  'https://vrthumb.imagetoday.co.kr/2021/01/28/tid316t001850.jpg',
  DGSWCertificaion,
];

const HomeBanner = (): JSX.Element => {
  return (
    <div className={cx('HomeBanner')}>
      <Carousel images={images} />
    </div>
  );
};

export default HomeBanner;
