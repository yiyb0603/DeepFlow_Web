import PageTemplate from 'components/Common/Base/PageTemplate';
import SignUp from 'components/Auth/SignUp';

const SignPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <SignUp />
    </PageTemplate>
  );
};

export default SignPage;