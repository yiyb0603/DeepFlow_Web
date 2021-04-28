import { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { userListState, userSearchKeywordState } from 'atom/user';
import { IUser, IUserListResponse } from 'types/user.types';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getMaxGeneration } from 'util/getMaxGeneration';
import useTabState from 'hooks/util/useTabState';
import { EUserSort } from 'lib/enum/user';

const useUserList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useRecoilState<string>(userSearchKeywordState);

  const [sortTab, onChangeSortTab] = useTabState<EUserSort>('sort', EUserSort.GENERATION);
  const [userList, setUserList] = useRecoilState<IUser[][]>(userListState);

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeyword(value);
  }, [setKeyword]);

  const filteredUsersByKeyword: IUser[][] = useMemo(() => {
    return userList.map((users) => {
      return users.filter((user) => user.name.includes(keyword));
    }
  )}, [keyword, userList]);

  const filteredUsers: IUser[][] = useMemo(() => {
    if (keyword.length > 0) {
      return filteredUsersByKeyword.filter((users) => users!.length > 0).map((user) => user!);
    } else {
      return filteredUsersByKeyword.map((user) => user!);
    }
  }, [filteredUsersByKeyword, keyword.length]);

  const requestUserList = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { status, data }: IUserListResponse = await getUserList(sortTab);
      const { users } = data;

      if (status === EResponse.OK) {
        setUserList([]);
        users.sort((a: IUser, b: IUser) => a.generation - b.generation);

        for (let generation = 1; generation < getMaxGeneration(); generation++) {
          const filteredByGeneration: IUser[] = users.filter((user: IUser) => user.generation === generation);
          
          setUserList((prevList: IUser[][]) => (
            [...prevList, filteredByGeneration]
          ));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setUserList, sortTab]);

  useEffect(() => {
    requestUserList();
  }, [requestUserList, sortTab]);

  return {
    keyword,
    onChangeKeyword,
    sortTab,
    onChangeSortTab,

    userList,
    filteredUsers,
    isLoading,
  };
};

export default useUserList;