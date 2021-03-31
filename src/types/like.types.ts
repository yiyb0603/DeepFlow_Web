import { IResponse } from './Response';
import { IUser } from './user.types';

export interface ILikeResponse extends IResponse {
  data: {
    likes: ILike[];
  },
}

export interface ILike {
  idx: number;
  user: IUser;
  pressedAt: Date;
}