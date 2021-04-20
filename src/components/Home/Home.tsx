import FadeIn from 'react-fade-in';
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
      <FadeIn>
        <Helmet />
        <HomeBanner />
        <RecentUsers />
        <RecentPost />
      </FadeIn>
    }
    </>
  );
};

export default Home;
