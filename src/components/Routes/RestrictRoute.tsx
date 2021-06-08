import { FC, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';

interface RestrictRouteProps {
  path: string;
  exact: boolean;
  isAdmin?: boolean;
  component: FC;
}

const RestrictRoute = ({
  component: Component,
  isAdmin = false,
}: RestrictRouteProps): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  if (isAdmin) {
    if (myInfo && myInfo.isAdmin) {
      return <Component />;
    } else {
      return <Redirect to='/not-found' />
    }
  } else {
    return getMyInfo() ? <Component /> : <Redirect to='/not-found' />
  }
};

export default RestrictRoute;