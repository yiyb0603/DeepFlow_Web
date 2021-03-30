import PageTemplate from 'components/Template/PageTemplate';
import UserListContainer from 'containers/UserList';

const UserListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserListContainer />
    </PageTemplate>
  );
};

export default UserListPage;