import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecentUsers from 'hooks/user/useRecentUsers';
import { IUser } from 'types/user.types';
import HomeSectionTitle from '../HomeSectionTitle';
import RecentUserItem from './RecentUserItem';

const style = require('./RecentUsers.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecentUsers = (): JSX.Element => {
  const { recentUsers } = useRecentUsers();

  return (
    <div className={cx('RecentUsers')}>
      <HomeSectionTitle title='최근 가입한 유저' />

      <div className={cx('RecentUsers-List')}>
        {
          recentUsers.map((user: IUser) => {
            const { idx, avatar, name, position } = user;

            return (
              <RecentUserItem
                key={idx}
                idx={idx}
                avatar={avatar}
                name={name}
                position={position}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default memo(RecentUsers);
