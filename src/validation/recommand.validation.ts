import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateRecommand = (reply: string): boolean => {
  if (isEmpty(reply)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  return true;
}