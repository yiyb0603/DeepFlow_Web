import PageTemplate from 'components/Template/PageTemplate';
import UserList from 'components/UserList';

const UserListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserList />
    </PageTemplate>
  );
};

export default UserListPage;