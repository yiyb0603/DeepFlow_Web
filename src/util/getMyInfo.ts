import { decodeToken } from 'lib/token';
import { IToken } from 'types/user.types';

export const getMyInfo = (): IToken => {
  const myInfo: IToken = decodeToken();
  return myInfo;
}