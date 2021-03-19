import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState, memo } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { groupingState } from 'converter/groupingState';
import PostForm from 'components/PostForm';
import { EPost } from 'lib/enum/post';
import { isEmpty } from 'converter/isEmpty';
import { errorToast, successToast } from 'lib/Toast';
import { customTrim } from 'converter/customTrim';
import { IPostDto } from 'lib/api/post/post.dto';
import { createPost, modifyPost } from 'lib/api/post/post.api';
import SubmitModal from 'components/PostForm/SubmitModal';
import { requestPostState } from 'atom/post';

const PostFormContainer = (): JSX.Element => {
  const history: History = useHistory();
  const [tagInput, setTagInput] = useState<string>('');
  const [postIdx, setPostIdx] = useState<number | null>(null);
  const [isSubmitModal, setIsSubmitModal] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');

  const [request, setRequest] = useRecoilState<IPostDto>(requestPostState);
  const { category, title, introduction, postTags } = request;

  const handleIsModal = useCallback((isModal: boolean): void => {
    setIsSubmitModal(isModal);

    if (customTrim(request.introduction).length > 150) {
      setRequest({
        ...request,
        introduction: request.introduction.slice(0, 150),
      });
    }
  }, [request, setRequest]);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setRequest({
      ...request,
      title: value,
    });
  }, [request, setRequest]);

  const onChangeIntroduction = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;

    setRequest({
      ...request,
      introduction: value,
    });
  }, [request, setRequest]);

  const onChangeCategory = useCallback((category: EPost): void => {
    setRequest({
      ...request,
      category,
    });
  }, [request, setRequest]);

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

    setRequest({
      ...request,
      postTags: [...postTags, tagInput],
    });
    setTagInput('');
  }, [tagInput, postTags, setRequest, request]);

  const onKeydownTagInput = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === ',' || e.key === 'Enter') {
      onChangePostTags();
    }
  }, [onChangePostTags]);

  const handleFilterPostTag = useCallback((tagName: string): void => {
    const { postTags } = request;
    
    setRequest({
      ...request,
      postTags: postTags.filter((tag) => tag !== tagName),
    });
  }, [request, setRequest]);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    
    setContents(value);
    setRequest({
      ...request,
      introduction: contents,
      contents: value,
    });
  }, [contents, request, setRequest]);

  const requestCreatePost = useCallback(async (isTemp: boolean): Promise<void> => {
    try {
      handleIsModal(false);

      if (isTemp) {
        if (postIdx === null) {
          const { idx } = await createPost(request, isTemp);
          setPostIdx(idx!);
        } else {
          await modifyPost(postIdx, request, isTemp);
        }
        
        successToast('글 임시저장을 성공하였습니다.');
      } else {
        if (postIdx === null) {
          await createPost(request, isTemp);
        } else {
          await modifyPost(postIdx, request, isTemp);
        }

        successToast('글 작성을 성공하였습니다.');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleIsModal, history, postIdx, request]);

  const handleKeyEvents = useCallback((e: globalThis.KeyboardEvent): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '\t');
    }

    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      requestCreatePost(true);
    }
  }, [requestCreatePost]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvents, true);

    return () => {
      document.removeEventListener('keydown', handleKeyEvents, true);
    }
  }, [handleKeyEvents]);
  
  return (
    <>
      {
        isSubmitModal &&
        <SubmitModal
          title={title}
          introductionState={groupingState('introduction', introduction, onChangeIntroduction)}
          handleIsModal={handleIsModal}
          requestCreatePost={requestCreatePost}
        />
      }

      <PostForm
        titleState={groupingState('title', title, onChangeTitle)}
        categoryState={groupingState('category', category, onChangeCategory)}
        tagInputState={groupingState('tagInput', tagInput, onChangeTagInput)}
        postTagState={groupingState('postTags', postTags, onChangePostTags)}
        contentsState={groupingState('contents', contents, onChangeContents)}
        onKeydownTagInput={onKeydownTagInput}
        handleFilterPostTag={handleFilterPostTag}
        handleIsModal={handleIsModal}
        requestCreatePost={requestCreatePost}
      />
    </>
  );
};

export default memo(PostFormContainer);