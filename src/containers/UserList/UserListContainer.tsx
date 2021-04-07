import useUserList from 'hooks/useUserList';
import UserList from 'components/UserList';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { IUser } from 'types/user.types';
import { groupingState } from 'converter/groupingState';
import UserLoading from 'components/UserList/UserLoading';

const UserListContainer = (): JSX.Element => {
  const { isLoading, userList } = useUserList();

  const [keyword, setKeyword] = useState('');
  const filteredUsersByKeyword = useMemo(() => {
    return userList.map((users) => {
      return users.filter((user) => user.name.includes(keyword));
    }
  )}, [keyword, userList]);

  const filteredUsers: (IUser[])[] = useMemo(() => {
    return filteredUsersByKeyword.filter((users) => users!.length > 0).map((user) => user!);
  }, [filteredUsersByKeyword]);

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeyword(value);
  }, []);

  if (isLoading) {
    return <UserLoading />;
  }

  return (
    <UserList
      filteredUsers={filteredUsers}
      keywordState={groupingState('keyword', keyword, onChangeKeyword)}
    />
  );
};

export default UserListContainer;