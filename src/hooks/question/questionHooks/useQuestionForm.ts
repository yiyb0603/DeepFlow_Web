import { useCallback, useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilState } from 'recoil';
import { initialRequestQuestionState, requestQuestionState } from 'atom/question';
import { MAX_TAG_LENGTH } from 'constants/question';
import { customTrim } from 'converter/customTrim';
import { historySingleton } from 'lib/singleton/history';
import { createPost, modifyPost } from 'lib/api/question/question.api';
import { IQuestionDto } from 'lib/api/question/question.dto';
import Toast from 'lib/Toast';
import { isEmpty } from 'util/isEmpty';
import { validateBeforeModal, validateQuestion } from 'validation/question.validation';
import useQuestionByIdx from './useQuestionByIdx';

const useQuestionForm = () => {
  const { question } = useQuestionByIdx();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContentsFocus, setIsContentsFocus] = useState<boolean>(false);

  const [tagInput, setTagInput] = useState<string>('');
  const [questionIdx, setQuestionIdx] = useState<number | null>(null);
  const [isSubmitModal, setIsSubmitModal] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');

  const [request, setRequest] = useRecoilState<IQuestionDto>(requestQuestionState);
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

    setRequest((request: IQuestionDto) => ({
      ...request,
      title: value,
    }));
  }, [setRequest]);

  const onChangeIntroduction = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;

    setRequest((request: IQuestionDto) => ({
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
      Toast.errorToast('태그는 최대 5개까지 가능합니다.');
      return;
    }

    const isExistTag: boolean = postTags.some((tag) => tag === customTrim(tagInput));
    if (isExistTag) {
      Toast.errorToast('중복된 태그 이름이 존재합니다.');
      return;
    }

    setRequest((request: IQuestionDto) => ({
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
    setRequest((request: IQuestionDto) => ({
      ...request,
      postTags: request.postTags.filter((tag) => tag !== tagName),
    }));
  }, [setRequest]);

  const onChangeContents = useCallback((text: string): void => {
    setContents(text);
    setRequest((request: IQuestionDto) => ({
      ...request,
      contents: text,
    }));
  }, [setRequest]);

  const requestOfferPost = useCallback(async (isTemp: boolean): Promise<void> => {
    try {
      if (!validateQuestion(request, isTemp)) {
        return;
      }

      if (isTemp) {
        if (questionIdx === null) {
          const { idx } = await createPost(request, isTemp);
          setQuestionIdx(idx!);
        } else {
          await modifyPost(questionIdx, request, isTemp);
        }
        
        Toast.successToast('글 임시저장을 성공하였습니다.');
      } else {
        setIsLoading(true);
        if (questionIdx === null) {
          await createPost(request, isTemp);
        } else {
          await modifyPost(questionIdx, request, isTemp);
        }

        setIsLoading(false);
        handleIsModal(false);
        Toast.successToast(`글 ${questionIdx === null ? '작성' : '수정'}을 성공하였습니다.`);
        historySingleton.push('/');

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
  }, [handleIsModal, questionIdx, request, setRequest]);

  const handleSetProperties = useCallback(async (): Promise<void> => {
    const { idx, title, thumbnail, introduction, contents, postTags } = question!;
    setQuestionIdx(idx);
    setContents(contents!);
    setRequest({
      title,
      introduction,
      thumbnail: thumbnail!,
      contents: contents!,
      postTags,
    });
  }, [question, setRequest]);

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
    if (question !== null) {
      handleSetProperties();
    }

    return () => setRequest(initialRequestQuestionState);
  }, [handleSetProperties, question, setRequest]);

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

export default useQuestionForm;