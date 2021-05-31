import { atom } from 'recoil';
import { IUser } from 'types/user.types';

export const popularUserListState = atom<IUser[]>({
  key: 'popularUserListState',
  default: [] as IUser[],
});

export const popularUserMountedState = atom<boolean>({
  key: 'popularUserMountedState',
  default: false,
});