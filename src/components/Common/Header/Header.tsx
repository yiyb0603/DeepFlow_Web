import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoLogoGithub } from 'react-icons/io';
import Headroom from 'react-headroom';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {
  authUrl: string;
}

const Header = ({ authUrl }: HeaderProps): JSX.Element => {
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

          {/* <div className={cx('Header-Contents-SearchWrap')}>
            <HiOutlineSearch className={cx('Header-Contents-SearchWrap-Icon')} />
            <input
              type='text'
              className={cx('Header-Contents-SearchWrap-Input')}
              placeholder='검색어를 입력하세요.'
            />
          </div> */}

          <a href={authUrl} className={cx('Header-Contents-LoginWrap')}>
            <IoLogoGithub className={cx('Header-Contents-LoginWrap-Icon')} />
            <div className={cx('Header-Contents-LoginWrap-Name')}>로그인</div>
          </a>
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
