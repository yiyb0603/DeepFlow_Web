import { atom } from 'recoil';
import { IUser } from 'types/user.types';

export const recentUserMountedState = atom<boolean>({
  key: 'recentUserMounted',
  default: false,
});

export const recentUserListState = atom<IUser[]>({
  key: 'recentUserListState',
  default: [] as IUser[],
});