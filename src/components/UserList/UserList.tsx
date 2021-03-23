import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IUser } from 'types/user.types';
import Generation from './Generation';
import TopSection from './TopSection';
import UserItem from './UserItem';

const style = require('./UserList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserListProps {
  userList: (IUser | IUser[])[];
}

const UserList = ({ userList }: UserListProps): JSX.Element => {
  return (
    <div className={cx('UserList')}>
      <TopSection />
      {
        userList.map((users: IUser | IUser[], idx: number) => {
          const generation: number = idx + 1;
          if (Array.isArray(users)) {
            const isExistGeneration: boolean = users.some((user) => user.generation === generation);

            return (
              <div key={idx}>
                {
                  isExistGeneration &&
                  <Generation text={generation + '기'} />
                }
                {
                  Array.isArray(users) &&
                  users.map(({ idx, avatar, name, description, joinedAt }: IUser) => {
                    return (
                      <UserItem
                        key={idx}
                        avatar={avatar}
                        name={name}
                        description={description}
                        joinedAt={joinedAt}
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
