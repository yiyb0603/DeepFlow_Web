import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import Cookie from 'lib/Cookie';
import { ETheme } from 'lib/enum/theme';
import { themeState } from 'lib/recoil/atom/theme';

const useTheme = () => {
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

  return {
    theme,
    handleChangeTheme,
  };
}

export default useTheme;