import { useCallback, memo } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoMdSunny } from 'react-icons/io';
import { FaMoon } from 'react-icons/fa';
import { themeState } from 'lib/recoil/atom/theme';
import { ETheme } from 'lib/enum/theme';
import Cookie from 'lib/Cookie';

const style = require('./ToggleTheme.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ToggleTheme = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState<ETheme>(themeState);
  const { LIGHT, DARK } = ETheme;

  const handleChangeTheme = useCallback((): void => {
    if (theme === DARK) {
      Cookie.setCookie('theme', LIGHT);
      setTheme(LIGHT);
      return;
    }

    Cookie.setCookie('theme', DARK);
    setTheme(DARK);
  }, [DARK, LIGHT, setTheme, theme]);

  return (
    <div className={cx('ToggleTheme')} onClick={handleChangeTheme}>
      {
        theme === LIGHT ? <FaMoon /> : <IoMdSunny />
      }
    </div>
  );
};

export default memo(ToggleTheme);
