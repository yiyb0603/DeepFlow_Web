import { useCallback, useRef, ChangeEvent } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { emojiIconListState } from 'atom/commentEmoji';
import { commentContentsState, commentFormLoadingState, commentListState, modifyState } from 'atom/comment';
import usePageParam from '../util/usePageParam';
import { createComment, deleteComment, getCommentsByPostIdx, modifyComment } from 'lib/api/comment/comment.api';
import { uploadFiles } from 'lib/api/uploads/uploads.api';
import { EResponse } from 'lib/enum/response';
import { ICommentDto } from 'lib/api/comment/comment.dto';
import { IComment, ICommentModify } from 'types/comment.types';
import { validateComment } from 'validation/comment.validation';
import { checkLoggedIn } from 'util/checkLoggedIn';
import useDragDrop from 'hooks/util/useDragDrop';

const useComment = () => {
  const postIdx: number = usePageParam();
  const { dragRef, handleDrop } = useDragDrop();  

  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [contents, setContents] = useRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(modifyState);
  const [iconEmojies, setIconEmojies] = useRecoilState<string[]>(emojiIconListState);

  const setIsLoading: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(commentFormLoadingState);

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

  const requestCommentList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { comments } } = await getCommentsByPostIdx(postIdx);

      if (status === EResponse.OK) {
        setCommentList(comments);

        for (const comment of comments) {
          for (const { emoji } of comment.emojies) {
            if (iconEmojies.includes(emoji)) {
              continue;
            }

            setIconEmojies((prevIconEmojies: string[]) => [...prevIconEmojies, emoji]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [iconEmojies, postIdx, setCommentList, setIconEmojies]);

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

  const requestDeleteComment = useCallback(async (commentIdx: number): Promise<void> => {
    try {
      const { status } = await deleteComment(commentIdx, postIdx);

      if (status === EResponse.OK) {
        setModifyObject(null);
        await requestCommentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [postIdx, requestCommentList, setModifyObject]);

  const handleDragImage = useCallback(async (e: ChangeEvent<HTMLInputElement> | DragEvent): Promise<void> => {
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
           const { selectionStart, selectionEnd, value } = commentInputRef.current!;
       
          for (let i = 0; i < files.length; i++) {
            const beforeText: string = value.substring(0, selectionStart);
            const nextText: string = value.substring(selectionEnd);

            const markdownImageText: string = `![이미지](${files[i]})`;
            setContents(beforeText + markdownImageText + nextText);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [setContents]);

  return {
    contents,
    onChangeContents,

    dragRef,
    handleDrop,
    handleDragImage,

    onModifyClick,
    commentInputRef,

    commentList,
    requestCommentList,

    requestOfferComment,
    requestDeleteComment,
  };
};

export default useComment;