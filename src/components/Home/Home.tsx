import useRecentPosts from 'hooks/post/useRecentPosts';
import Helmet from 'components/Common/Helmet';
import HomeBanner from './HomeBanner';
import HomeLoading from './HomeLoading';
import RecentPost from './RecentPost';
import RecentUsers from './RecentUsers';

const Home = (): JSX.Element => {
  const { isLoading } = useRecentPosts();

  return (
    <>
    {
      isLoading ? <HomeLoading />
      :
      <div>
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
