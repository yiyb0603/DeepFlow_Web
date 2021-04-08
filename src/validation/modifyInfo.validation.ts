import { MAX_BLOG_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_LOCATION_LENGTH, MAX_POSITION_LENGTH } from 'constants/user';
import { EMAIL_REGULAR } from 'constants/util';
import { IUserModify } from 'lib/api/user/user.dto';
import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateModifyInfo = (modifyInfo: IUserModify): boolean => {
  const { name, email, location, position, description, blog } = modifyInfo;

  if (isEmpty(name) || isEmpty(email) || isEmpty(location) || isEmpty(position) || isEmpty(description) || isEmpty(blog)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if (position.length > MAX_POSITION_LENGTH) {
    errorToast('개발 포지션은 최대 50자까지 가능합니다.');
    return false;
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    errorToast('한줄소개는 최대 100자까지 가능합니다.');
    return false;
  }

  if (location.length > MAX_LOCATION_LENGTH) {
    errorToast('직장은 최대 50자까지 가능합니다.');
    return false;
  }

  if (blog.length > MAX_BLOG_LENGTH) {
    errorToast('개인 링크는 최대 100자까지 가능합니다.');
    return false;
  }

  if (!EMAIL_REGULAR.test(email)) {
    errorToast('올바르지 않은 이메일 표현식 입니다.');
    return false;
  }
  
  return true;
}