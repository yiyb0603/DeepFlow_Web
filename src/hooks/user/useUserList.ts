import { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { IUser, IUserListResponse } from 'types/user.types';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getGenerations } from 'util/getGenerations';

const useUserList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userList, setUserList] = useState<IUser[][]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeyword(value);
  }, []);

  const filteredUsersByKeyword = useMemo(() => {
    return userList.map((users) => {
      return users.filter((user) => user.name.includes(keyword));
    }
  )}, [keyword, userList]);

  const filteredUsers: (IUser[])[] = useMemo(() => {
    if (keyword.length > 0) {
      return filteredUsersByKeyword.filter((users) => users!.length > 0).map((user) => user!);
    } else {
      return filteredUsersByKeyword.map((user) => user!);
    }
  }, [filteredUsersByKeyword, keyword.length]);

  const requestUserList = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { status, data }: IUserListResponse = await getUserList();
      const { users } = data;

      if (status === EResponse.OK) {
        setUserList([]);
        users.sort((a: IUser, b: IUser) => a.generation - b.generation);

        for (let generation = 1; generation < getGenerations(); generation++) {
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
  }, [setUserList]);

  useEffect(() => {
    requestUserList();
  }, [requestUserList]);

  return {
    keyword,
    onChangeKeyword,
    filteredUsers,
    isLoading,
  };
};

export default useUserList;