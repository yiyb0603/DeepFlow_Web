import { useCallback, memo } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoMdSunny } from 'react-icons/io';
import { FaMoon } from 'react-icons/fa';
import { themeState } from 'atom/theme';
import { ETheme } from 'lib/enum/theme';
import { setCookie } from 'lib/Cookie';

const style = require('./ToggleTheme.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ToggleTheme = (): JSX.Element => {
  const [theme, setTheme] = useRecoilState<ETheme>(themeState);
  const { LIGHT, DARK } = ETheme;

  const handleChangeTheme = useCallback((): void => {
    if (theme === DARK) {
      setCookie('theme', LIGHT);
      setTheme(LIGHT);
      return;
    }

    setCookie('theme', DARK);
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