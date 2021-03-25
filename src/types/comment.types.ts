import { IResponse } from './Response';

export interface IComment {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

export interface ICommentListResponse extends IResponse {
  data: {
    comments: IComment[];
  },
}