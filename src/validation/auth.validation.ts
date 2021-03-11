import { isEmpty } from "converter/isEmpty";
import { errorToast } from "lib/Toast";
import { IRegisterRequest } from "types/user.types";

export const validateSignUp = (request: IRegisterRequest): boolean => {
  const { position, githubInfo } = request;
  const { description, location } = githubInfo;

  if (isEmpty(position) || isEmpty(description) || isEmpty(location)) {
    errorToast('빈칸없이 입력해주세요.');
    return false;
  }

  return true;
}