import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_NAME } from 'constants/util';
import usePopularUsers from 'hooks/user/usePopularUsers';
import { IUser } from 'types/user.types';
import SectionTitle from '../SectionTitle';
import PopularUserItem from './PopularUserItem';

const style = require('./PopularUser.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PopularUser = (): JSX.Element => {
  const { popularUsers } = usePopularUsers();

  return (
    <div className={cx('PopularUser')}>
      <SectionTitle title={`${APP_NAME}의 인기 유저목록`} />
    
      <div className={cx('PopularUser-Users')}>
        {
          popularUsers.map((user: IUser, order: number) => {
            const { idx, name, position, recommandCount } = user;

            return (
              <PopularUserItem
                key={idx}
                idx={idx}
                name={name}
                position={position}
                order={order}
                recommandCount={recommandCount}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default memo(PopularUser);