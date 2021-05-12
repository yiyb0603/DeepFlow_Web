import { atom } from 'recoil';
import { IReplyModify } from 'types/reply.types';

export const commentIdxState = atom<number>({
  key: 'commentIdxState',
  default: -1,
});

export const modifyReplyState = atom<IReplyModify | null>({
  key: 'modifyReplyState',
  default: null,
});

export const isShowReplyState = atom<boolean>({
  key: 'isShowReplyState',
  default: false,
});

export const replyContents = atom<string>({
  key: 'replyContents',
  default: '',
});