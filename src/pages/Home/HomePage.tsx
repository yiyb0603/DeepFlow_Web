import HomeContainer from 'containers/Home';
import PageTemplate from 'components/Template/PageTemplate';

const HomePage = (): JSX.Element => {
  return (
    <PageTemplate>
      <HomeContainer />
    </PageTemplate>
  );
};

export default HomePage;