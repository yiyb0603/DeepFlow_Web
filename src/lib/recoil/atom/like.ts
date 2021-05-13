import { atom } from 'recoil';
import { ILike } from 'types/like.types';

export const isLikePressedState = atom<boolean>({
  key: 'isLikePressedState',
  default: false,
});

export const likeListState = atom<ILike[]>({
  key: 'likeListState',
  default: [] as ILike[],
});