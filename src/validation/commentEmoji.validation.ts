import Toast from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateCommentEmoji = (emoji: string): boolean => {
  if (isEmpty(emoji)) {
    Toast.errorToast('올바르지 않은 이모지입니다.');
    return false;
  }

  return true;
}