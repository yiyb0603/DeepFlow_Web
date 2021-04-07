import PageTemplate from 'components/Template/PageTemplate';
import UserTemplate from 'components/User';
import UserRecommandContainer from 'containers/UserRecommand';

const UserRecommandPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserTemplate>
        <UserRecommandContainer />
      </UserTemplate>
    </PageTemplate>
  );
}

export default UserRecommandPage;