import { IUser } from './user.types';

export interface IReply {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
  fk_comment_idx: number;
}

export interface IReplyModify {
  idx: number;
  commentIdx: number;
  postIdx: number;
  contents: string;
}