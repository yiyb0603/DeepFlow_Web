import { atom } from 'recoil';
import Cookie from 'lib/Cookie';
import { ETheme } from 'lib/enum/theme';

const { LIGHT, DARK } = ETheme;

export const getTheme = (): ETheme => {
  const theme: ETheme = Number(Cookie.getCookie('theme'));

  if (theme === DARK) {
    return DARK;
  }

  return LIGHT;
};

export const themeState = atom<ETheme>({
  key: 'themeState',
  default: getTheme(),
});