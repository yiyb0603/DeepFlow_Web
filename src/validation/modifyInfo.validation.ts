import { IUserModify } from 'lib/api/user/user.dto';
import { errorToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';

export const validateModifyInfo = (modifyInfo: IUserModify): boolean => {
  const { name, email, location, position, description, blog } = modifyInfo;

  if (isEmpty(name) || isEmpty(email) || isEmpty(location) || isEmpty(position) || isEmpty(description) || isEmpty(blog)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }
  
  return true;
}