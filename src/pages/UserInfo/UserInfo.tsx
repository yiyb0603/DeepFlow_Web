import PageTemplate from 'components/Template/PageTemplate';
import UserTemplate from 'components/User';
import UserInfo from 'components/User/UserInfo';

const UserInfoPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserTemplate>
        <UserInfo />
      </UserTemplate>
    </PageTemplate>
  );
}

export default UserInfoPage;