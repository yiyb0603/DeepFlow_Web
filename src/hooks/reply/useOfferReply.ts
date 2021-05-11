import { useCallback, ChangeEvent, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { replyContents, modifyReplyState, isShowReplyState } from 'atom/reply';
import useCommentList from 'hooks/comment/useCommentList';
import usePageParam from 'hooks/util/usePageParam';
import { modifyReply, createReply } from 'lib/api/reply/reply.api';
import { IReplyDto } from 'lib/api/reply/reply.dto';
import { uploadFiles } from 'lib/api/uploads/uploads.api';
import { EResponse } from 'lib/enum/response';
import { IReplyModify } from 'types/reply.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { validateReply } from 'validation/reply.validation';
import UploadError from 'error/UploadError';
import useDragDrop from 'hooks/util/useDragDrop';

const useOfferReply = (commentIdx: number) => {
  const postIdx: number = usePageParam();
  const { requestCommentList } = useCommentList();
  const { dragRef } = useDragDrop();

  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const [contents, setContents] = useRecoilState<string>(replyContents);
  const [modifyObject, setModifyObject] = useRecoilState<IReplyModify | null>(modifyReplyState);

  const setIsShowReply = useSetRecoilState<boolean>(isShowReplyState);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

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
        if (replyInputRef.current !== null) {
          for (const file of files) {
            const { selectionStart, selectionEnd, value } = replyInputRef.current;

            const beforeText: string = value.substring(0, selectionStart);
            const nextText: string = value.substring(selectionEnd);

            const markdownImageText: string = `\n![이미지](${file})\n`;
            const mergedText: string = String(beforeText + markdownImageText + nextText);

            replyInputRef.current.value = mergedText;
            setContents(mergedText);

            replyInputRef.current.setSelectionRange(selectionStart, selectionEnd);
          }
        }
      }
    } catch (error) {
      new UploadError(error).uploadError();
    }
  }, [setContents, replyInputRef]);

  const requestOfferReply = useCallback(async (): Promise<void> => {
    try {
      if (!validateReply(contents)) {
        return;
      }

      const replyDto: IReplyDto = {
        contents,
        commentIdx,
        postIdx,
      };

      if (modifyObject !== null) {
        const { status } = await modifyReply(modifyObject.idx, replyDto);

        if (status === EResponse.OK) {
          setModifyObject(null);
        }
      } else {
        await createReply(replyDto);
      }

      await requestCommentList();
      setContents('');
      setIsShowReply(true);
    } catch (error) {
      console.log(error);
    }
  }, [commentIdx, contents, modifyObject, postIdx, requestCommentList, setContents, setIsShowReply, setModifyObject]);

  return {
    contents,
    onChangeContents,
    replyInputRef,
    replyDragRef: dragRef,
    handleDragImage,
    requestOfferReply,
  };
}

export default useOfferReply;