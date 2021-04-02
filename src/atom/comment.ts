import { atom } from 'recoil';
import { ECommentTab } from 'lib/enum/comment';
import { IComment, ICommentModify } from 'types/comment.types';

export const commentContentsState = atom<string>({
  key: 'commentContentsState',
  default: '',
});

export const modifyState = atom<ICommentModify | null>({
  key: 'modifyState',
  default: null,
});

export const commentTabState = atom<ECommentTab>({
  key: 'commentTabState',
  default: ECommentTab.WRITE,
});

export const commentListState = atom<IComment[]>({
  key: 'commentListState',
  default: [] as IComment[],
});