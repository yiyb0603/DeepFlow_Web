import usePopularUsers from 'hooks/user/usePopularUsers';
import { IUser } from 'types/user.types';
import UserItem from 'components/Common/User/UserItem';

const PopularUserList = (): JSX.Element => {
  const { filteredUsers } = usePopularUsers();

  return (
    <>
      {
        filteredUsers.map((user: IUser, index: number) => {
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
              rankIndex={index + 1}
              showRank={true}
            />
          );
        })
      }
    </>
  );
}

export default PopularUserList;