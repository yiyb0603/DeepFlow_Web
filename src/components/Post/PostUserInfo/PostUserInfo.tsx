import { useCallback, useMemo } from 'react';
import { AiOutlineGithub, AiOutlineLink } from 'react-icons/ai';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';

const style = require('./PostUserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostUserInfoProps {
  idx: number;
  avatar: string;
  name: string;
  description: string;
  blog: string;
  github: string;
  location: string;
};

const PostUserInfo = ({
  idx,
  avatar,
  name,
  description,
  blog,
  github,
  location,
}: PostUserInfoProps): JSX.Element => {
  const userInfoLink: string = useMemo(() => `/user/${idx}`, [idx]);

  const handlePushToAdress = useCallback((address: string): void => {
    window.open(address, '_blank');
  }, []);

  return (
    <div className={cx('PostUserInfo')}>
      <div className={cx('PostUserInfo-Left')}>
        <img
          src={avatar}
          className={cx('PostUserInfo-Left-Profile')}
          alt='avatar'
        />

        <div className={cx('PostUserInfo-Left-Contents')}>
          <Link
            to={userInfoLink}
            className={cx('PostUserInfo-Left-Contents-Name')}
          >
            {name}
          </Link>
          <div className={cx('PostUserInfo-Left-Contents-Description')}>{description}</div>
          
          <div className={cx('PostUserInfo-Left-Contents-Location')}>🏬 {location}</div>
        </div>
      </div>

      <div className={cx('PostUserInfo-Right')}>
        <AiOutlineGithub style={{ marginRight: 5, }} onClick={() => handlePushToAdress(github)} />
        <AiOutlineLink onClick={() => handlePushToAdress(blog)} />
      </div>
    </div>
  );
};

export default PostUserInfo;
