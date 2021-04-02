import * as jwt from 'jsonwebtoken';
import { IToken } from 'types/user.types';
import { getCookie } from './Cookie';

export const decodeToken = (): IToken => {
  const token = getCookie('access_token');
  return jwt.decode(token) as IToken;
}

export const getToken = (): string => {
  return getCookie('access_token') as string;
}