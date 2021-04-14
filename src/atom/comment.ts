import { atom } from 'recoil';
import { IComment, ICommentModify } from 'types/comment.types';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';

export const commentContentsState = atom<string>({
  key: 'commentContentsState',
  default: '',
});

export const modifyState = atom<ICommentModify | null>({
  key: 'modifyState',
  default: null,
});

export const commentListState = atom<IComment[]>({
  key: 'commentListState',
  default: [] as IComment[],
});

export const commentEmojiListState = atom<ICommentEmojiInfo[]>({
  key: 'commentEmojiListState',
  default: [] as ICommentEmojiInfo[],
});