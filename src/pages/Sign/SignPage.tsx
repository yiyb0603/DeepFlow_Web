import { memo } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import SignUp from 'components/Auth/SignUp';

const SignPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <SignUp />
    </PageTemplate>
  );
};

export default memo(SignPage);