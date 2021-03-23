import { useRecoilState } from 'recoil';
import { userListState } from 'atom/user';
import { IUser, IUserListResponse } from 'types/user.types';
import { useCallback, useEffect } from 'react';
import { getUserList } from 'lib/api/user/user.api';
import { EResponse } from 'lib/enum/response';
import { getGenerations } from 'util/getGenerations';

const useUserList = () => {
  const [userList, setUserList] = useRecoilState<(IUser | IUser[])[]>(userListState);

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
    if (userList.length <= 0) {
      requestUserList();
    }
  }, [userList, requestUserList]);

  return {
    userList,
  };
};

export default useUserList;