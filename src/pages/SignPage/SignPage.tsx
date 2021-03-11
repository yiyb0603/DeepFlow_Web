import React from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import SignUpContainer from 'containers/Auth/SignUp';

const SignPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <SignUpContainer />
    </PageTemplate>
  );
};

export default SignPage;