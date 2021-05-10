import * as jwt from 'jsonwebtoken';
import { IToken } from 'types/user.types';
import Cookie from '../Cookie';

export const decodeToken = (): IToken => {
  const token = Cookie.getCookie('access_token');
  return jwt.decode(token) as IToken;
}

export const getToken = (): string => {
  return Cookie.getCookie('access_token') as string;
}