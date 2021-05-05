import { IResponse } from './Response';
import { IUser } from './user.types';

export interface INotice {
  idx: number;
  title: string;
  contents: string;
  user: IUser;
  createdAt: Date | string;
  updatedAt: Date | null;
  viewCount: number;
}

export interface INoticeListResponse extends IResponse {
  data: {
    notices: INotice[];
  },
}

export interface INoticeResponse extends IResponse {
  data: {
    notice: INotice;
  },
}