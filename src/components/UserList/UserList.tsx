import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PageTitle from 'components/Common/PageTitle';
import { IUser } from 'types/user.types';
import Generation from './Generation';
import UserItem from '../Common/User/UserItem';

const style = require('./UserList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserListProps {
  userList: (IUser | IUser[])[];
}

const UserList = ({ userList }: UserListProps): JSX.Element => {
  return (
    <div className={cx('UserList')}>
      <PageTitle title='유저 목록' subTitle='유저 목록이 여기에 표시됩니다.' />
      {
        userList.map((users: IUser | IUser[], idx: number) => {
          const generation: number = idx + 1;
          if (Array.isArray(users)) {
            const isExistGeneration: boolean = users.some((user) => user.generation === generation);

            return (
              <div key={idx}>
                {
                  isExistGeneration &&
                  <Generation text={`${generation}기`} />
                }
                {
                  Array.isArray(users) &&
                  users.map((user: IUser) => {
                    const { idx, avatar, name, description, joinedAt } = user;
                    return (
                      <UserItem
                        key={idx}
                        idx={idx}
                        avatar={avatar}
                        name={name}
                        text={description}
                        date={joinedAt}
                      />
                    );
                  })
                }
              </div>
            );
          } else {
            return null;
          }
        })
      }
    </div>
  );
};

export default UserList;
