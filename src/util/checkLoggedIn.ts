import { errorToast } from 'lib/Toast';
import { IToken } from 'types/user.types';
import { getMyInfo } from './getMyInfo'
import { isNullOrUndefined } from './isNullOrUndefined';

export const checkLoggedIn = (): boolean => {
  const myInfo: IToken = getMyInfo();

  if (isNullOrUndefined(myInfo)) {
    errorToast('로그인 후 이용 가능합니다.');
    return false;
  }

  return true;
}