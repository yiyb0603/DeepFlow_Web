import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IUserRecommand } from 'types/userRecommand.types';
import UserItem from 'components/Common/User/UserItem';
import RecommandFormContainer from 'containers/UserRecommand/RecommandForm';

const style = require('./UserRecommand.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserRecommandProps {
  userRecommands: IUserRecommand[];
  requestDeleteRecommand: (recommandIdx: number) => Promise<void>;
}

const UserRecommand = ({
  userRecommands,
  requestDeleteRecommand,
}: UserRecommandProps): JSX.Element => {
  return (
    <div className={cx('UserRecommand')}>
      <RecommandFormContainer />

      <div className={cx('UserRecommand-List')}>
        {
          userRecommands.map((recommand) => {
            const { idx, reason, recommandAt, user } = recommand;

            return (
              <UserItem
                key={idx}
                idx={user.idx}
                name={user.name}
                avatar={user.avatar}
                text={reason}
                date={recommandAt}
                canDelete={true}
                onDelete={() => requestDeleteRecommand(idx)}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default UserRecommand;
