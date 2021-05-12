import { atom } from 'recoil';

export const commentIdxState = atom<number>({
  key: 'commentIdxState',
  default: -1,
});

export const isShowReplyState = atom<boolean>({
  key: 'isShowReplyState',
  default: false,
});

export const replyContents = atom<string>({
  key: 'replyContents',
  default: '',
});