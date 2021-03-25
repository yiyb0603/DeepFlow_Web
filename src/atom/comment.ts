import { atom } from 'recoil';
import { IComment } from 'types/comment.types';

export const commentListState = atom<IComment[]>({
  key: 'commentListState',
  default: [] as IComment[],
});