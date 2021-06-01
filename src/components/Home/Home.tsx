import FadeIn from 'react-fade-in';
import useRecentQuestions from 'hooks/question/useRecentQuestions';
import Helmet from 'components/Common/Helmet';
import HomeBanner from './HomeBanner';
import HomeLoading from './HomeLoading';
import RecentQuestion from './RecentQuestion';
import RecentUsers from './RecentUsers';

const Home = (): JSX.Element => {
  const { isLoading } = useRecentQuestions();

  if (isLoading) {
    return <HomeLoading />;
  }

  return (
    <FadeIn>
      <Helmet />
      <HomeBanner />
      <RecentUsers />
      <RecentQuestion />
    </FadeIn>
  );
};

export default Home;
