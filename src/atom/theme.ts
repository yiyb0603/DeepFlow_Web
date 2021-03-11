import { getCookie } from "lib/Cookie";
import { ETheme } from "lib/enum/theme";
import { atom } from "recoil";

const { LIGHT, DARK } = ETheme;

export const themeState = atom<ETheme>({
  key: 'themeState',
  default: Number(getCookie('theme')),
});

export const getTheme = (): ETheme => {
  const theme: ETheme = Number(getCookie('theme'));

  if (theme === DARK) {
    return DARK;
  }

  return LIGHT;
};