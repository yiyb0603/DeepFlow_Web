import { MAX_REASON_LENGTH } from 'constants/recommand';
import { IRecommandDto } from 'lib/api/userRecommand/userRecommand.dto';
import { errorToast } from 'lib/Toast';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { isEmpty } from 'util/isEmpty';

export const validateRecommand = ({ reason, userIdx }: IRecommandDto): boolean => {
  const myInfo: IToken = getMyInfo();

  if (isEmpty(reason)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if ((myInfo && myInfo.idx) === userIdx) {
    errorToast('자기 자신을 추천할 수 없습니다.');
    return false;
  }

  if (reason.length > MAX_REASON_LENGTH) {
    errorToast('사유는 최대 255자까지 가능합니다.');
    return false;
  }

  return true;
}