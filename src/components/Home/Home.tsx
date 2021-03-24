import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import RecentPostContainer from 'containers/Home/RecentPost';
import HomeBanner from './HomeBanner';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = (): JSX.Element => {
  return (
    <div className={cx('Home')}>
      <HomeBanner />
      <RecentPostContainer />
    </div>
  );
};

export default Home;
