import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import UserInfo from 'components/UserInfo';
import useUserInfo from 'hooks/useUserInfo';
import UserLoading from 'components/UserList/UserLoading';
import { EUserPost } from 'lib/enum/post';
import { groupingState } from 'converter/groupingState';

const UserContainer = (): JSX.Element => {
  const {
    isLoading,
    userInfo,
    userPostList,
    userPostTab,
    setUserPostTab,
  } = useUserInfo();
  const history: History<unknown> = useHistory();

  const onChangeUserPostTab = useCallback((userPostTab: EUserPost): void => {
    history.push(`?tab=${userPostTab}`);
    setUserPostTab(userPostTab);
  }, [history, setUserPostTab]);

  return (
    <>
    {
      userInfo === null && isLoading ? <UserLoading /> :
      <UserInfo
        userInfo={userInfo!}
        userPostTabState={groupingState('userPostTab', userPostTab, onChangeUserPostTab)}
        userPostList={userPostList}
      />
    }
    </>
  );
}

export default UserContainer;