import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { customTrim } from 'converter/customTrim';
import PageTitle from 'components/Common/PageTitle';
import { IUser } from 'types/user.types';
import Generation from './Generation';
import UserItem from '../Common/User/UserItem';
import SearchUsers from './SearchUsers';
import NoItems from 'components/Common/NoItems';

const style = require('./UserList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserListProps {
  filteredUsers: IUser[][];

  keywordState: {
    keyword: string;
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

const UserList = ({
  filteredUsers,
  keywordState,
}: UserListProps): JSX.Element => {
  const { keyword } = keywordState;

  return (
    <div className={cx('UserList')}>
      <PageTitle title='유저 목록' subTitle='유저 목록이 여기에 표시됩니다.'>
        <SearchUsers keywordState={keywordState} />
      </PageTitle>
      {
        filteredUsers.length > 0 ? filteredUsers.map((users: IUser[], idx: number) => {
          const generation: number = customTrim(keyword).length > 0 ? users[0].generation : idx + 1;
          const isExistGeneration: boolean = users.some((user: IUser) => user.generation === generation);

          return (
            <div key={idx}>
              {
                isExistGeneration &&
                <Generation text={`${generation}기`} />
              }
              {
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
        }) : <NoItems text='검색한 유저가 없습니다.' />
      }
    </div>
  );
};

export default UserList;
