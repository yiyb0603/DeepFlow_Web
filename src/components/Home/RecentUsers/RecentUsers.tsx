import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecentUsers from 'hooks/useRecentUsers';
import SectionTitle from '../SectionTitle';
import RecentUserItem from './RecentUserItem';

const style = require('./RecentUsers.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecentUsers = (): JSX.Element => {
  const { recentUsers } = useRecentUsers();

  return (
    <div className={cx('RecentUsers')}>
      <SectionTitle title='최근 가입한 유저' />

      <div className={cx('RecentUsers-List')}>
        {
          recentUsers.map((user) => {
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

export default RecentUsers;
