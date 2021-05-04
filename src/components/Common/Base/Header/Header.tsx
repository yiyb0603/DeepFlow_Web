import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import { themeState } from 'atom/theme';
import { ETheme } from 'lib/enum/theme';
import useHeader from 'hooks/header/useHeader';
import WhiteThemeLogo from 'assets/icons/TextBlackLogo.svg';
import BlackThemeLogo from 'assets/icons/TextWhiteLogo.svg';
import { GITHUB_AUTH_URL } from 'constants/auth';
import ToggleMenu from '../MobileSidebar/ToggleMenu';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Header = (): JSX.Element => {
  const history: History = useHistory();
  const { myInfo, handleLogout } = useHeader();

  const [isSideShow, setIsSideShow] = useState<boolean>(false);
  const theme: ETheme = useRecoilValue<ETheme>(themeState);

  const handlePushToPage = useCallback((url: string): void => {
    history.push(url);
  }, [history]);

  return (
    <div className={cx('Header')}>
      <div className={cx('Header-Contents')}>
        <ToggleMenu isSideShow={isSideShow} setIsSideShow={setIsSideShow} />

        <div className={cx('Header-Contents-LogoWrap')}>
          <img
            src={theme === ETheme.DARK ? BlackThemeLogo : WhiteThemeLogo}
            alt='logo'
            className={cx('Header-Contents-LogoWrap-Logo')}
            onClick={() => handlePushToPage('/')}
          />
        </div>

        <div className={cx('Header-Contents-RightWrap')}>
          <AiOutlineSearch
            className={cx('Header-Contents-RightWrap-SearchIcon')}
            onClick={() => handlePushToPage('/search-questions')}
          />

          <a
            href={GITHUB_AUTH_URL}
            className={cx('Header-Contents-RightWrap-Login')}
            onClick={handleLogout}
          >
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
