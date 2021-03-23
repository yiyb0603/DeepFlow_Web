import useUserList from 'hooks/useUserList';
import UserList from 'components/UserList';

const UserListContainer = (): JSX.Element => {
  const { userList } = useUserList();

  return (
    <UserList
      userList={userList}
    />
  );
};

export default UserListContainer;