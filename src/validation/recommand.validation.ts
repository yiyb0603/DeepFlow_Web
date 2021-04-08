import { MAX_REASON_LENGTH } from 'constants/recommand';
import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateRecommand = (reason: string): boolean => {
  if (isEmpty(reason)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if (reason.length > MAX_REASON_LENGTH) {
    errorToast('사유는 최대 255자까지 가능합니다.');
    return false;
  }

  return true;
}