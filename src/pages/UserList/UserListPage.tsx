import PageTemplate from 'components/Common/Base/PageTemplate';
import UserList from 'components/UserList';

const UserListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserList />
    </PageTemplate>
  );
};

export default UserListPage;