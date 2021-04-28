import { customTrim } from 'converter/customTrim';
import { IUser } from 'types/user.types';
import NoItems from 'components/Common/NoItems';
import UserItem from 'components/Common/User/UserItem';
import GenerationTitle from './GenerationTitle';

interface GenerationUserListProps {
  filteredUsers: IUser[][];
  keyword: string;
}

const GenerationUserList = ({
  filteredUsers,
  keyword,
}: GenerationUserListProps): JSX.Element => {
  return (
    <>
    {
      filteredUsers.length > 0 ? filteredUsers.map((users: IUser[], idx: number) => {
        const generation: number = customTrim(keyword).length > 0 ? users[0].generation : idx + 1;
        const isExistGeneration: boolean = users.some((user: IUser) => user.generation === generation);

        return (
          <div key={idx}>
            {
              isExistGeneration &&
              <GenerationTitle
                text={`${generation}기`}
              />
            }
            {
              users.map((user: IUser) => {
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
                  />
                );
              })
            }
          </div>
        );
      }) : <NoItems text='검색한 유저가 없습니다.' />
    }
    </>
  );
}

export default GenerationUserList;