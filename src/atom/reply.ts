import { atom } from 'recoil';
import { IReplyModify } from 'types/reply.types';

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