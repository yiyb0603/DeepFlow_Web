import { FC, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';

interface RestrictRouteProps {
  path: string;
  exact: boolean;
  isAllow: boolean;
  isAdmin?: boolean;
  component: FC;
}

const RestrictRoute = ({
  component: Component,
  isAllow,
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
    if (isAllow) {
      return <Component />
    } else {
      return getMyInfo() ? <Component /> : <Redirect to='/not-found' />
    }
  }
};

export default RestrictRoute;