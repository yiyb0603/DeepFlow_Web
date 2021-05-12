import { EMOJI_REGULAR } from 'constants/regExp'
import Toast from 'lib/Toast'
import { isEmpty } from 'util/isEmpty'

export const validateCommentEmoji = (emoji: string): boolean => {
  if (isEmpty(emoji) || !EMOJI_REGULAR.test(emoji)) {
    Toast.errorToast('올바르지 않은 이모지입니다.');
    return false;
  }

  return true;
}