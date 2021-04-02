import { ECommentTab } from 'lib/enum/comment';
import { atom } from 'recoil';
import { IComment } from 'types/comment.types';

export const commentTabState = atom<ECommentTab>({
  key: 'commentTabState',
  default: ECommentTab.WRITE,
});

export const commentListState = atom<IComment[]>({
  key: 'commentListState',
  default: [] as IComment[],
});