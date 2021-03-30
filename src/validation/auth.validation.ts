import { isEmpty } from 'util/isEmpty';
import { errorToast } from 'lib/Toast';
import { IRegisterRequest } from 'types/user.types';
import { EMAIL_REGULAR } from 'constants/auth';

export const validateSignUp = (request: IRegisterRequest): boolean => {
  const { position, description, location, email, blog } = request;

  if (isEmpty(position) || isEmpty(description) || isEmpty(location) || isEmpty(email) || isEmpty(blog)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  if (!EMAIL_REGULAR.test(email)) {
    errorToast('올바르지 않는 이메일 정규식입니다.');
    return false;
  }

  return true;
}