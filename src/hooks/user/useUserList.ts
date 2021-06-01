import { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserList } from 'lib/api/user/user.api';
import { userListState, userSearchKeywordState } from 'lib/recoil/atom/user';
import { EUserSort } from 'lib/enum/user';
import { EResponse } from 'lib/enum/response';
import { userListSelector } from 'lib/recoil/selector/user';
import isNullOrUndefined from 'util/isNullOrUndefined';
import getMaxGeneration from 'util/getMaxGeneration';
import useTabState from 'hooks/util/useTabState';
import { IUser } from 'types/user.types';

const useUserList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useRecoilState<string>(userSearchKeywordState);

  const [sortTab, onChangeSortTab] = useTabState<EUserSort>('sort', EUserSort.GENERATION);
  const [userList, setUserList] = useRecoilState<IUser[][]>(userListState);

  const userListResponse: IUser[] = useRecoilValue(userListSelector(sortTab));

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

  const handleSetUsersByGeneration = useCallback((users: IUser[]): void => {
    setUserList([]);
    for (let generation = 1; generation < getMaxGeneration(); generation++) {
      const filteredByGeneration: IUser[] = users.filter((user: IUser) => user.generation === generation);

      setUserList((prevList: IUser[][]) => (
        [...prevList, filteredByGeneration]
      ));
    }
  }, [setUserList]);

  const requestUserList = useCallback((): void => {
    if (isNullOrUndefined(userListResponse)) {
      return;
    }

    setIsLoading(true);
    userListResponse.slice().sort((a: IUser, b: IUser) => a.generation - b.generation);

    handleSetUsersByGeneration(userListResponse);
    setIsLoading(false);
  }, [handleSetUsersByGeneration, userListResponse]);

  const requestUserListCallback = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { users } } = await getUserList(sortTab);

      if (status === EResponse.OK) {
        handleSetUsersByGeneration(users);
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleSetUsersByGeneration, sortTab]);

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
    requestUserListCallback,
  };
};

export default useUserList;