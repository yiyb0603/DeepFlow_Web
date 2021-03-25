import { atom } from "recoil";
import { IUser } from "types/user.types";

export const userInfoState = atom<IUser | null>({
  key: 'userInfoState',
  default: null,
});

export const userListState = atom<(IUser | IUser[])[]>({
  key: 'userListState',
  default: [] as (IUser | IUser[])[],
});