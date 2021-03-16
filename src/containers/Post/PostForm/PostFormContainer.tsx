import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { groupingState } from 'converter/groupingState';
import PostForm from 'components/PostForm';
import { EPost } from 'lib/enum/post';
import { isEmpty } from 'converter/isEmpty';
import { errorToast } from 'lib/Toast';
import { customTrim } from 'converter/customTrim';

const PostFormContainer = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<EPost>(EPost.QUESTION);
  const [tagInput, setTagInput] = useState<string>('');
  const [postTags, setPostTags] = useState<string[]>([]);
  const [contents, setContents] = useState<string>('');

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setTitle(value);
  }, []);

  const onChangeCategory = useCallback((category: EPost): void => {
    setCategory(category);
  }, []);

  const onChangeTagInput = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    if (value === ',') {
      return;
    }

    setTagInput(value);
  }, []);

  const onChangePostTags = useCallback((): void => {
    if (isEmpty(tagInput)) {
      return;
    }

    if (postTags.length >= 5) {
      errorToast('태그는 최대 5개까지 가능합니다.');
      return;
    }

    const isExistTag: boolean = postTags.some((tag) => tag === customTrim(tagInput));
    if (isExistTag) {
      errorToast('중복된 태그 이름이 존재합니다.');
      return;
    }

    setPostTags([...postTags, tagInput]);
    setTagInput('');
  }, [postTags, tagInput]);

  const onKeydownTagInput = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === ',' || e.key === 'Enter') {
      onChangePostTags();
    }
  }, [onChangePostTags]);

  const handleFilterPostTag = useCallback((tagName: string): void => {
    setPostTags(postTags.filter((tag) => tag !== tagName));
  }, [postTags]);

  const onChangeContents = useCallback((text: string): void => {
    setContents(text);
  }, []);
  
  return (
    <PostForm
      titleState={groupingState('title', title, onChangeTitle)}
      categoryState={groupingState('category', category, onChangeCategory)}
      tagInputState={groupingState('tagInput', tagInput, onChangeTagInput)}
      postTagState={groupingState('postTags', postTags, onChangePostTags)}
      contentsState={groupingState('contents', contents, onChangeContents)}
      onKeydownTagInput={onKeydownTagInput}
      handleFilterPostTag={handleFilterPostTag}
    />
  );
};

export default PostFormContainer;