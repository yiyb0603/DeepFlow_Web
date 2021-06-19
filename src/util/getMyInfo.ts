import Token from 'lib/token';
import { IToken } from 'types/user.types';

export const getMyInfo = (): IToken => {
  const myInfo: IToken = Token.decodeToken();
  return myInfo;
}