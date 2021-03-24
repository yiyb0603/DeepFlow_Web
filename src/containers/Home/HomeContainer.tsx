import Home from 'components/Home';
import HomeLoading from 'components/Home/HomeLoading';
import useRecentPosts from 'hooks/useRecentPosts';

const HomeContainer = (): JSX.Element => {
  const { isLoading } = useRecentPosts();

  if (isLoading) {
    return <HomeLoading />
  }

  return (
    <Home />
  );
};

export default HomeContainer;