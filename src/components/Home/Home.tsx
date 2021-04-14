import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecentPosts from 'hooks/post/useRecentPosts';
import Helmet from 'components/Common/Helmet';
import HomeBanner from './HomeBanner';
import HomeLoading from './HomeLoading';
import RecentPost from './RecentPost';
import RecentUsers from './RecentUsers';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = (): JSX.Element => {
  const { isLoading } = useRecentPosts();

  return (
    <>
    {
      isLoading ? <HomeLoading />
      :
      <div className={cx('Home')}>
        <Helmet />
        <HomeBanner />
        <RecentUsers />
        <RecentPost />
      </div>
    }
    </>
  );
};

export default Home;
