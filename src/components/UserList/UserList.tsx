import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { customTrim } from 'converter/customTrim';
import useUserList from 'hooks/user/useUserList';
import { IUser } from 'types/user.types';
import Generation from './Generation';
import UserItem from '../Common/User/UserItem';
import PageTitle from 'components/Common/PageTitle';
import NoItems from 'components/Common/NoItems';
import UserLoading from './UserLoading';
import Helmet from 'components/Common/Helmet';
import SearchInput from 'components/Common/Input/SearchInput';

const style = require('./UserList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const UserList = (): JSX.Element => {
  const {
    isLoading,
    keyword,
    onChangeKeyword,
    userList,
    filteredUsers,
  } = useUserList();

  return (
    <>
    {
      isLoading && userList.length <= 0 ? <UserLoading />
      :
      <div className={cx('UserList')}>
        <Helmet title='유저 목록' />
        <PageTitle title='유저 목록' subTitle='유저 목록이 여기에 표시됩니다.'>
          <SearchInput
            value={keyword}
            onChangeValue={onChangeKeyword}
            placeholder='유저 이름을 검색하세요'
            padding={'0.35rem'}
          />
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
                    const { idx, avatar, name, description, position, joinedAt } = user;
                    return (
                      <UserItem
                        key={idx}
                        idx={idx}
                        avatar={avatar}
                        name={name}
                        text={description}
                        position={position}
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
    }
    </>
  );
};

export default UserList;
