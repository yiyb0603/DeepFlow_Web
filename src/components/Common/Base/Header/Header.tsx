import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoLogoGithub } from 'react-icons/io';
import WhiteThemeLogo from 'assets/icons/TextBlackLogo.svg';
import BlackThemeLogo from 'assets/icons/TextWhiteLogo.svg';
import { GITHUB_AUTH_URL } from 'constants/auth';
import { ETheme } from 'lib/enum/theme';
import useHeader from 'hooks/header/useHeader';
import useTheme from 'hooks/theme/useTheme';
import ToggleMenu from '../MobileSidebar/ToggleMenu';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Header = (): JSX.Element => {
  const { myInfo, handleLogout } = useHeader();
  const { theme } = useTheme();

  return (
    <div className={cx('Header')}>
      <div className={cx('Header-Contents')}>
        <ToggleMenu />

        <div className={cx('Header-Contents-LogoWrap')}>
          <Link to='/'>
            <img
              src={theme === ETheme.DARK ? BlackThemeLogo : WhiteThemeLogo}
              alt='logo'
              className={cx('Header-Contents-LogoWrap-Logo')}
            />
          </Link>
        </div>

        <div className={cx('Header-Contents-RightWrap')}>
          <Link to='/search-questions'>
            <AiOutlineSearch
              className={cx('Header-Contents-RightWrap-SearchIcon')}
            />
          </Link>

          <a
            href={GITHUB_AUTH_URL}
            className={cx('Header-Contents-RightWrap-Login')}
            onClick={handleLogout}
          >
            <IoLogoGithub className={cx('Header-Contents-RightWrap-Login-Icon')} />
            <span className={cx('Header-Contents-RightWrap-Login-Name')}>
              {
                !myInfo ? '로그인' : '로그아웃'
              }
            </span>
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