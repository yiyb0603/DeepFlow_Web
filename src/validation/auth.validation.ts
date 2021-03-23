import { isEmpty } from "util/isEmpty";
import { errorToast } from "lib/Toast";
import { IRegisterRequest } from "types/user.types";

export const validateSignUp = (request: IRegisterRequest): boolean => {
  const { position, description, location, blog } = request;

  if (isEmpty(position) || isEmpty(description) || isEmpty(location) || isEmpty(blog)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  return true;
}