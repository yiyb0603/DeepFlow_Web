import { atom } from 'recoil';

export const toggleEmojiState = atom<boolean>({
  key: 'toggleEmojiState',
  default: false,
});

export const emojiCommentIdxState = atom<number>({
  key: 'emojiCommentIdxState',
  default: 0,
});