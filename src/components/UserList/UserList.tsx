import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useUserList from 'hooks/user/useUserList';
import { ISortTab } from 'lib/models/tabs/sortTabs';
import { userSortTabs } from 'lib/models/tabs/userSortTabs';
import { EUserSort } from 'lib/enum/user';
import PageTitle from 'components/Common/PageTitle';
import Helmet from 'components/Common/Helmet';
import SearchInput from 'components/Common/Input/SearchInput';
import SelectTab from 'components/Common/SelectTab';
import UserLoading from './UserLoading';
import GenerationUserList from './GenerationUserList';
import PopularUserList from './PopularUserList';
import isEmpty from 'util/isEmpty';

const style = require('./UserList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const UserList = (): JSX.Element => {
  const {
    isLoading,
    keyword,
    onChangeKeyword,
    sortTab,
    onChangeSortTab,
    userList,
    filteredUsers,
  } = useUserList();

  if (isLoading && isEmpty(userList)) {
    return <UserLoading />;
  }

  return (
    <div className={cx('UserList')}>
      <Helmet title='유저 목록' />
      <PageTitle title='유저 목록' subTitle='유저 목록이 여기에 표시됩니다.'>
        <SearchInput
          value={keyword}
          onChangeValue={onChangeKeyword}
          placeholder='유저 이름을 검색하세요'
          padding='0.35rem'
          fontSize='1.2rem'
        />
      </PageTitle>

      <div className={cx('UserList-TabWrapper')}>
      {
        userSortTabs.map(({ name, route }: ISortTab, idx: number) => (
          <SelectTab
            key={idx}
            name={name}
            route={route}
            selectTab={sortTab}
            onChangeSelectTab={onChangeSortTab}
            type='Short'
          />
        ))
      }
      </div>

      {
        sortTab === EUserSort.GENERATION ? (
          <GenerationUserList
            filteredUsers={filteredUsers}
            keyword={keyword}
          />
        ) : <PopularUserList />
      }
    </div>
  );
};

export default UserList;
