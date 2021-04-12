import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import UserItem from 'components/Common/User/UserItem';
import RecommandTitle from './RecommandTitle';
import useRecommand from 'hooks/user/useRecommand';
import RecommandForm from './RecommandForm';

const style = require('./UserRecommand.scss');
const cx: ClassNamesFn = classNames.bind(style);

const UserRecommand = (): JSX.Element => {
  const {
    userInfo,
    userRecommands,
    requestDeleteRecommand,
  } = useRecommand();
  
  return (
    <>
    {
      userInfo !== null &&
      <div className={cx('UserRecommand')}>
        <RecommandTitle userName={userInfo.name} />
        <RecommandForm />

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
    }
    </>
  );
};

export default UserRecommand;
