import { IResponse } from './Response';
import { IUser } from './user.types';

export interface IUserRecommand {
  idx: number;
  reason: string;
  recommandAt: Date | string;
  pressedUser: IUser;
}

export interface IUserRecommandResponse extends IResponse {
  data: {
    recommands: IUserRecommand[];
  },
}