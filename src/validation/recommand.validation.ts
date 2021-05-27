import { MAX_REASON_LENGTH } from 'constants/recommand';
import { IRecommandDto } from 'lib/api/userRecommand/userRecommand.dto';
import Toast from 'lib/Toast';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import isEmpty from 'util/isEmpty';

export const validateRecommand = (request: IRecommandDto): boolean => {
  const myInfo: IToken = getMyInfo();
  const { reason, userIdx } = request;

  if (isEmpty(reason)) {
    Toast.errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if ((myInfo && myInfo.idx) === userIdx) {
    Toast.errorToast('자기 자신을 추천할 수 없습니다.');
    return false;
  }

  if (reason.length > MAX_REASON_LENGTH) {
    Toast.errorToast('사유는 최대 255자까지 가능합니다.');
    return false;
  }

  return true;
}