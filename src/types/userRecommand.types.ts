import { IResponse } from './Response';
import { IUser } from './user.types';

export interface IUserRecommand {
  idx: number;
  reason: string;
  recommandAt: Date | string;
  user: IUser;
}

export interface IUserRecommandResponse extends IResponse {
  data: {
    recommands: IUserRecommand[];
  },
}