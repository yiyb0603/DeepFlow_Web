import { IQuestionDto } from 'lib/api/question/question.dto';
import { errorToast } from 'lib/Toast';
import { MAX_INTRODUCTION_LENGTH, MAX_TAG_LENGTH, MAX_TITLE_LENGTH } from 'constants/question';
import { isEmpty } from 'util/isEmpty';
import { isNullOrUndefined } from 'util/isNullOrUndefined';

export const validateBeforeModal = (request: IQuestionDto): boolean => {
  const { title, contents, postTags } = request;

  if (isEmpty(title) || isEmpty(contents)) {
    errorToast('빈칸 없이 입력해주세요.');
    return false;
  }

  if (title.length > MAX_TITLE_LENGTH) {
    errorToast('제목은 최대 100자까지 가능합니다.');
    return false;
  }

  if (isEmpty(postTags)) {
    errorToast('태그를 1개이상 입력해주세요.');
    return false;
  }

  if (postTags.length > MAX_TAG_LENGTH) {
    errorToast('태그는 최대 5개까지만 가능합니다.');
    return false;
  }
  
  return true;
}

export const validateQuestion = (request: IQuestionDto, isTemp: boolean): boolean => {
  const { title, thumbnail, introduction, contents, postTags } = request;

  if (isEmpty(title) || (isEmpty(introduction) && !isTemp) || isEmpty(contents)) {
    errorToast('빈칸 없이 입력해주세요.');
    return false;
  }

  if (!isTemp) {
    if (isNullOrUndefined(thumbnail) || isEmpty(thumbnail)) {
      errorToast('썸네일을 추가해주세요.');
      return false;
    }
  }

  if (!isTemp) {
    if (introduction.length > MAX_INTRODUCTION_LENGTH) {
      errorToast('소개는 최대 150자까지 가능합니다.');
      return false;
    }
  }

  if (postTags.length > MAX_TAG_LENGTH) {
    errorToast('태그는 최대 5개까지만 가능합니다.');
    return false;
  }

  return true;
}