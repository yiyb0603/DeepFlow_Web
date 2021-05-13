import { useCallback, useRef, ChangeEvent } from 'react';
import { useRecoilState, SetterOrUpdater, useSetRecoilState } from 'recoil';
import { commentModifyState, commentFormLoadingState, commentContentsState } from 'lib/recoil/atom/comment';
import usePageParam from 'hooks/util/usePageParam';
import { createComment, modifyComment } from 'lib/api/comment/comment.api';
import { ICommentDto } from 'lib/api/comment/comment.dto';
import { ICommentModify } from 'types/comment.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { validateComment } from 'validation/comment.validation';
import useCommentList from './useCommentList';
import { EResponse } from 'lib/enum/response';
import { uploadFiles } from 'lib/api/uploads/uploads.api';
import useDragDrop from 'hooks/util/useDragDrop';
import UploadError from 'error/UploadError';

const useOfferComment = () => {
  const postIdx: number = usePageParam();
  const { requestCommentList } = useCommentList();
  const { dragRef, handleDrop } = useDragDrop(); 

  const [contents, setContents] = useRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(commentModifyState);
  const setIsLoading: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(commentFormLoadingState);

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

  const onModifyClick = useCallback((idx: number, contents: string): void => {
    setModifyObject({
      idx,
      contents,
    });
    setContents(contents);

    const inputElement: any = document.getElementsByClassName('CommentInput')[0] as any;
    const moveTo: number = inputElement.offsetTop - inputElement.clientHeight;

    window.scrollTo({
      top: moveTo,
    });
  }, [setContents, setModifyObject]);

  const handleDragImage = useCallback(async (
    e: ChangeEvent<HTMLInputElement> | DragEvent,
  ): Promise<void> => {
    if (!checkLoggedIn()) {
      return;
    }

    try {
      let images: FileList | null = null;

      if (e instanceof DragEvent) {
        images = e.dataTransfer?.files!;
      } else {
        images = e.target.files!;
      }

      const formData: FormData = new FormData();
      for (const image of images) {
        formData.append('images', image);
      }

      const { status, data: { files } } = await uploadFiles(formData);
      if (status === EResponse.OK) {
        if (commentInputRef.current !== null) {
          for (const file of files) {
            const { selectionStart, selectionEnd, value } = commentInputRef.current!;

            const beforeText: string = value.substring(0, selectionStart);
            const nextText: string = value.substring(selectionEnd);

            const markdownImageText: string = `\n![이미지](${file})\n`;
            const mergedText: string = String(beforeText + markdownImageText + nextText);

            commentInputRef.current.value = mergedText;
            setContents(mergedText);

            commentInputRef.current.setSelectionRange(selectionStart, selectionEnd);
          }
        }
      }
    } catch (error) {
      new UploadError(error).uploadError();
    }
  }, [setContents]);

  const requestOfferComment = useCallback(async (): Promise<void> => {
    try {
      if (!checkLoggedIn() || !validateComment(contents)) {
        return;
      }

      setIsLoading(true);
      const commentDto: ICommentDto = {
        postIdx,
        contents,
      };

      if (modifyObject === null) {
        await createComment(commentDto);
      } else {
        await modifyComment(modifyObject.idx, commentDto);
      }

      setContents('');
      setModifyObject(null);
      await requestCommentList();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [contents, modifyObject, postIdx, requestCommentList, setContents, setIsLoading, setModifyObject]);

  return {
    contents,
    onChangeContents,
    onModifyClick,
    commentDragRef: dragRef,
    handleDrop,
    commentInputRef,
    handleDragImage,
    requestOfferComment,
  };
}

export default useOfferComment;