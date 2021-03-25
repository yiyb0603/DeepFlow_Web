import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IUser } from 'types/user.types';
import InfoBox from './InfoBox';

const style = require('./UserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserInfoProps {
  userInfo: IUser;
}

const UserInfo = ({ userInfo }: UserInfoProps): JSX.Element => {
  const { avatar, githubId, name, email, description, position, blog } = userInfo;

  return (
    <div className={cx('UserInfo')}>
      <InfoBox
        avatar={avatar}
        githubId={githubId}
        name={name}
        email={email}
        description={description}
        position={position}
        blog={blog}
      />
    </div>
  );
};

export default UserInfo;
