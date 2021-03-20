import { useCallback } from 'react';
import { AiOutlineGithub, AiOutlineLink } from 'react-icons/ai';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostUserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostUserInfoProps {
  avatar: string;
  name: string;
  description: string;
  blog: string;
  github: string;
  location: string;
};

const PostUserInfo = ({
  avatar,
  name,
  description,
  blog,
  github,
  location,
}: PostUserInfoProps): JSX.Element => {
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
          <div className={cx('PostUserInfo-Left-Contents-Name')}>{name}</div>
          <div className={cx('PostUserInfo-Left-Contents-Description')}>{description}</div>
          
          <div className={cx('PostUserInfo-Left-Contents-Location')}>🏬 {location}</div>
        </div>
      </div>

      <div className={cx('PostUserInfo-Right')}>
        <AiOutlineGithub onClick={() => handlePushToAdress(github)} />
        <AiOutlineLink onClick={() => handlePushToAdress(blog)} />
      </div>
    </div>
  );
};

export default PostUserInfo;
