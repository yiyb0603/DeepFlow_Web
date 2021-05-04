import { MAX_TITLE_LENGTH } from 'constants/notice';
import { INoticeDto } from 'lib/api/notice/notice.dto';
import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateNotice = (request: INoticeDto): boolean => {
  const { title, contents } = request;

  if (isEmpty(title) || isEmpty(contents)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if (title.length > MAX_TITLE_LENGTH) {
    errorToast('제목은 100자까지 입력가능합니다');
    return false;
  }

  return true;
}