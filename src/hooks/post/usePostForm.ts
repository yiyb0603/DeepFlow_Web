import { useCallback, useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { useRecoilState } from 'recoil';
import { requestPostState } from 'atom/post';
import { MAX_TAG_LENGTH } from 'constants/post';
import { customTrim } from 'converter/customTrim';
import { createPost, modifyPost } from 'lib/api/post/post.api';
import { IPostDto } from 'lib/api/post/post.dto';
import { errorToast, successToast } from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';
import { validateBeforeModal, validatePost } from 'validation/post.validation';
import usePostByIdx from './usePostByIdx';

const usePostForm = () => {
  const history: History = useHistory();
  const { post } = usePostByIdx();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContentsFocus, setIsContentsFocus] = useState<boolean>(false);

  const [tagInput, setTagInput] = useState<string>('');
  const [postIdx, setPostIdx] = useState<number | null>(null);
  const [isSubmitModal, setIsSubmitModal] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');

  const [request, setRequest] = useRecoilState<IPostDto>(requestPostState);
  const { title, introduction, postTags } = request;

  const handleIsModal = useCallback((isModal: boolean): void => {
    if (!validateBeforeModal(request)) {
      return;
    }

    setIsSubmitModal(isModal);
  }, [request]);

  const onChangeIsContentsFocus = useCallback(() => {
    setIsContentsFocus((prevFocus) => !prevFocus);
  }, []);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;

    setRequest((request: IPostDto) => ({
      ...request,
      title: value,
    }));
  }, [setRequest]);

  const onChangeIntroduction = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;

    setRequest((request: IPostDto) => ({
      ...request,
      introduction: value,
    }));
  }, [setRequest]);

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

    if (postTags.length >= MAX_TAG_LENGTH) {
      errorToast('태그는 최대 5개까지 가능합니다.');
      return;
    }

    const isExistTag: boolean = postTags.some((tag) => tag === customTrim(tagInput));
    if (isExistTag) {
      errorToast('중복된 태그 이름이 존재합니다.');
      return;
    }

    setRequest((request: IPostDto) => ({
      ...request,
      postTags: [...postTags, tagInput],
    }));
    setTagInput('');
  }, [tagInput, postTags, setRequest]);

  const onKeydownTagInput = useCallback(({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === ',' || key === 'Enter') {
      onChangePostTags();
    }
  }, [onChangePostTags]);

  const handleFilterPostTag = useCallback((tagName: string): void => {
    setRequest((request: IPostDto) => ({
      ...request,
      postTags: request.postTags.filter((tag) => tag !== tagName),
    }));
  }, [setRequest]);

  const onChangeContents = useCallback((text: string): void => {
    setContents(text);
    setRequest((request: IPostDto) => ({
      ...request,
      contents: text,
    }));
  }, [setRequest]);

  const requestOfferPost = useCallback(async (isTemp: boolean): Promise<void> => {
    try {
      if (!validatePost(request, isTemp)) {
        return;
      }

      if (isTemp) {
        if (postIdx === null) {
          const { idx } = await createPost(request, isTemp);
          setPostIdx(idx!);
        } else {
          await modifyPost(postIdx, request, isTemp);
        }
        
        successToast('글 임시저장을 성공하였습니다.');
      } else {
        setIsLoading(true);
        if (postIdx === null) {
          await createPost(request, isTemp);
        } else {
          await modifyPost(postIdx, request, isTemp);
        }

        setIsLoading(false);
        handleIsModal(false);
        successToast('글 작성을 성공하였습니다.');
        history.push('/');

        setRequest({
          title: '',
          introduction: '',
          thumbnail: '',
          contents: '',
          postTags: [],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleIsModal, history, postIdx, request, setRequest]);

  const handleSetProperties = useCallback(async (): Promise<void> => {
    const { idx, title, thumbnail, introduction, contents, postTags } = post!;
    setPostIdx(idx);
    setContents(contents!);
    setRequest({
      title,
      introduction,
      thumbnail: thumbnail!,
      contents: contents!,
      postTags,
    });
  }, [post, setRequest]);

  const handleKeyEvents = useCallback((e: globalThis.KeyboardEvent): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '\t');
    }

    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      requestOfferPost(true);
    }
  }, [requestOfferPost]);

  useEffect(() => {
    if (post !== null) {
      handleSetProperties();
    }
  }, [handleSetProperties, post]);

  useEffect(() => {
    if (isContentsFocus) {
      document.addEventListener('keydown', handleKeyEvents, true);

      return () => {
        document.removeEventListener('keydown', handleKeyEvents, true);
      };
    }
  }, [handleKeyEvents, isContentsFocus]);

  return {
    isLoading,

    onChangeIsContentsFocus,

    title,
    onChangeTitle,

    contents,
    onChangeContents,

    introduction,
    onChangeIntroduction,

    tagInput,
    onChangeTagInput,
    onKeydownTagInput,

    postTags,
    onChangePostTags,
    handleFilterPostTag,
    
    requestOfferPost,
    isSubmitModal,
    handleIsModal,
  };
}

export default usePostForm;