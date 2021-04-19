import { MouseEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecommand from 'hooks/user/useRecommand';
import { IUserRecommand } from 'types/userRecommand.types';
import UserItem from 'components/Common/User/UserItem';
import RecommandTitle from './RecommandTitle';
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
            userRecommands.map((recommand: IUserRecommand) => {
              const { idx, reason, recommandAt, pressedUser } = recommand;

              return (
                <UserItem
                  key={idx}
                  idx={pressedUser.idx}
                  name={pressedUser.name}
                  avatar={pressedUser.avatar}
                  text={reason}
                  position={pressedUser.position}
                  date={recommandAt}
                  canDelete={true}
                  onDelete={(e: MouseEvent<SVGElement>) => requestDeleteRecommand(e, idx)}
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

export default memo(UserRecommand);
