import { memo, useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_NAME } from 'constants/util';
import { IUser } from 'types/user.types';
import { SIDE_POPULAR_USER_COUNT } from 'constants/user';
import usePopularUsers from 'hooks/user/usePopularUsers';
import SectionTitle from '../SectionTitle';
import NoPopularItems from '../NoPopularItems';
import SidePopularUserItem from './SidePopularUserItem';
import ViewMore from '../ViewMore';

const style = require('./SidePopularUsers.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SidePopularUsers = (): JSX.Element => {
  const { popularUsers, requestPopularUsers } = usePopularUsers();

  useEffect(() => {
    requestPopularUsers();
  }, [requestPopularUsers]);

  return (
    <div className={cx('SidePopularUsers')}>
      <SectionTitle title={`${APP_NAME}의 인기 유저목록`} />
    
      <div className={cx('SidePopularUsers-ContentsWrap')}>
        <div className={cx('SidePopularUsers-ContentsWrap-Users')}>
          {
            popularUsers.length > 0 ?
            popularUsers.slice(0, SIDE_POPULAR_USER_COUNT).map((user: IUser, order: number) => {
              const { idx, name, position, recommandCount } = user;

              return (
                <SidePopularUserItem
                  key={idx}
                  idx={idx}
                  name={name}
                  position={position}
                  order={order}
                  recommandCount={recommandCount}
                />
              );
            }) : <NoPopularItems title='현재 인기유저가 없습니다.' />
          }
        </div>

        <ViewMore link='/users?sort=popular' />
      </div>
    </div>
  );
};

export default memo(SidePopularUsers);