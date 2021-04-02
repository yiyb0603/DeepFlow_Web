import { IResponse } from './Response';
import { IUser } from './user.types';

export interface IComment {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
}

export interface ICommentModify {
  idx: number;
  contents: string;
}

export interface ICommentListResponse extends IResponse {
  data: {
    comments: IComment[];
  },
}