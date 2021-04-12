import { memo } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import UserTemplate from 'components/User';
import UserRecommand from 'components/User/UserRecommand';

const UserRecommandPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <UserTemplate>
        <UserRecommand />
      </UserTemplate>
    </PageTemplate>
  );
}

export default memo(UserRecommandPage);