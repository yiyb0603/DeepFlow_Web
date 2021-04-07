import { MouseEvent, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoLogoGithub } from 'react-icons/io';
import { ReactComponent as LogoImage } from 'assets/icons/TextLogo.svg';
import { GITHUB_AUTH_URL } from 'constants/auth';
import { IUser } from 'types/user.types';
import ToggleMenu from '../MobileSidebar/ToggleMenu';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {
  myInfo: IUser | null;
  handleLogout: (e: MouseEvent<HTMLHyperlinkElementUtils>) => void;
}

const Header = ({ myInfo, handleLogout }: HeaderProps): JSX.Element => {
  const history: History = useHistory();
  const [isSideShow, setIsSideShow] = useState<boolean>(false);

  const handlePushToHome = useCallback((): void => {
    history.push('/');
  }, [history]);

  return (
    <div className={cx('Header')}>
      <div className={cx('Header-Contents')}>
        <ToggleMenu isSideShow={isSideShow} setIsSideShow={setIsSideShow} />

        <div className={cx('Header-Contents-LogoWrap')}>
          <LogoImage
            className={cx('Header-Contents-LogoWrap-Logo')}
            onClick={handlePushToHome}
          />
        </div>

        <div className={cx('Header-Contents-RightWrap')}>
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
