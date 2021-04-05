import { useCallback, useEffect, useState } from 'react';
import { IUser, IUserListResponse } from 'types/user.types';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getGenerations } from 'util/getGenerations';

const useUserList = () => {
  const [userList, setUserList] = useState<(IUser | IUser[])[]>([]);

  const requestUserList = useCallback(async (): Promise<void> => {
    try {
      const { status, data }: IUserListResponse = await getUserList();
      const { users } = data;

      if (status === EResponse.OK) {
        users.sort((a: IUser, b: IUser) => a.generation - b.generation);

        for (let generation = 1; generation < getGenerations(); generation++) {
          const filteredByGeneration: IUser[] = users.filter((user: IUser) => user.generation === generation);
          
          setUserList((prevList: (IUser | IUser[])[]) => (
            [...prevList, filteredByGeneration]
          ));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserList]);

  useEffect(() => {
    requestUserList();
  }, [requestUserList]);

  return {
    userList,
  };
};

export default useUserList;