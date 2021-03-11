import { atom } from "recoil";
import { IGithubUser } from "types/user.types";

export const githubInfoState = atom<IGithubUser | null>({
  key: 'githubInfoState',
  default: null,
});

export const registerLoading = atom<boolean>({
  key: 'registerLoading',
  default: false,
});