import * as jwt from 'jsonwebtoken'
import { IToken } from 'types/user.types';
import { getCookie } from "./Cookie"

export const decodeToken = (): IToken => {
  const token = getCookie('accessToken');
  return jwt.decode(token) as IToken;
}