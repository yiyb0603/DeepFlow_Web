import { atom } from "recoil";
import { IUser } from "types/user.types";

export const userInfoState = atom<IUser | null>({
  key: 'myInfoState',
  default: null,
});