import { IUser } from './user.types';

export interface ICommentEmoji {
  count: number;
  emoji: string;
  users: ICommentEmojiInfo[];
}

export interface ICommentEmojiInfo {
  idx: number;
  emoji: string;
  fk_comment_idx: number;
  pressedAt: Date;
  user: IUser;
}