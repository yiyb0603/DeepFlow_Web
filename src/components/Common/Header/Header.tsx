import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoLogoGithub } from 'react-icons/io';
import Headroom from 'react-headroom';
import { IUser } from 'types/user.types';
import ToggleMenu from '../MobileSidebar/ToggleMenu';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {
  authUrl: string;
  myInfo: IUser | null;
  handleLogout: (e: MouseEvent<HTMLHyperlinkElementUtils>) => void;
}

const Header = ({ authUrl, myInfo, handleLogout }: HeaderProps): JSX.Element => {
  const [isSideShow, setIsSideShow] = useState<boolean>(false);

  return (
    <div className={cx('Header')}>
      <div className={cx('Header-Contents')}>
        <ToggleMenu isSideShow={isSideShow} setIsSideShow={setIsSideShow} />

        <div className={cx('Header-Contents-LogoWrap')}>
          <img
            src='https://jenyasegeda.com/images/logo.svg'
            alt='logo'
          />
        </div>

        <div className={cx('Header-Contents-RightWrap')}>
          <a href={authUrl} className={cx('Header-Contents-RightWrap-Login')} onClick={handleLogout}>
            <IoLogoGithub className={cx('Header-Contents-RightWrap-Login-Icon')} />
            <div className={cx('Header-Contents-RightWrap-Login-Name')}>
              {
                !myInfo ? '로그인' : '로그아웃'
              }
            </div>
          </a>

          {
            myInfo &&
            <Link to={`/user/${myInfo.idx}`}>
              <img
                src={myInfo.avatar}
                className={cx('Header-Contents-RightWrap-Profile')}
                alt='profile'
              />
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
