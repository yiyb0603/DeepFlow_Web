import { useCallback, useEffect, useState } from 'react';
import { IUser, IUserListResponse } from 'types/user.types';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getGenerations } from 'util/getGenerations';

const useUserList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userList, setUserList] = useState<IUser[][]>([]);

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
    isLoading,
    userList,
  };
};

export default useUserList;