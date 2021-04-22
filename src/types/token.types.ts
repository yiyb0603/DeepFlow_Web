import { IResponse } from './Response';

export interface ITokenResponse extends IResponse {
  data: {
    refreshToken: string;
  },
}