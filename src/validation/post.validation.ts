import { IPostDto } from 'lib/api/post/post.dto';
import { errorToast } from 'lib/Toast';
import { MAX_TAG_LENGTH } from 'constants/post';
import { isEmpty } from 'util/isEmpty';
import { isNullOrUndefined } from 'util/isNullOrUndefined';

export const validatePost = (request: IPostDto): boolean => {
  const { title, thumbnail, introduction, contents, postTags } = request;

  if (isEmpty(title) || isEmpty(introduction) || isEmpty(contents)) {
    errorToast('빈칸 없이 입력해주세요.');
    return false;
  }

  if (isNullOrUndefined(thumbnail) || isEmpty(thumbnail)) {
    errorToast('썸네일을 추가해주세요.');
    return false;
  }

  if (postTags.length > MAX_TAG_LENGTH) {
    errorToast('태그는 최대 5개까지만 가능합니다.');
    return false;
  }

  return true;
}