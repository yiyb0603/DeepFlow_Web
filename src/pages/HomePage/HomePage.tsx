import React from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import Home from 'components/Home';

const HomePage = (): JSX.Element => {
  return (
    <PageTemplate>
      <Home />
    </PageTemplate>
  );
};

export default HomePage;