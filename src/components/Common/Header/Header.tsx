import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoLogoGithub } from 'react-icons/io';
import Headroom from 'react-headroom';
import { IUser } from 'types/user.types';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {
  authUrl: string;
  myInfo: IUser | null;
  handleLogout: (e: MouseEvent<HTMLHyperlinkElementUtils>) => void;
}

const Header = ({ authUrl, myInfo, handleLogout }: HeaderProps): JSX.Element => {
  return (
    <Headroom>
      <div className={cx('Header')}>
        <div className={cx('Header-Contents')}>
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
              <img
                src={myInfo.avatar}
                className={cx('Header-Contents-RightWrap-Profile')}
                alt='profile'
              />
            }
          </div>
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
