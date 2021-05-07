import { useCallback, ChangeEvent } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { emojiIconListState } from 'atom/commentEmoji';
import { commentContentsState, commentFormLoadingState, commentListState, modifyState } from 'atom/comment';
import usePageParam from '../util/usePageParam';
import { createComment, deleteComment, getCommentsByPostIdx, modifyComment } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import { ICommentDto } from 'lib/api/comment/comment.dto';
import { IComment, ICommentModify } from 'types/comment.types';
import { validateComment } from 'validation/comment.validation';
import { checkLoggedIn } from 'util/checkLoggedIn';

const useComment = () => {
  const postIdx: number = usePageParam();

  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [contents, setContents] = useRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(modifyState);
  const [iconEmojies, setIconEmojies] = useRecoilState<string[]>(emojiIconListState);

  const setIsLoading: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(commentFormLoadingState);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

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
      }

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

  return {
    contents,
    onChangeContents,

    commentList,
    requestCommentList,

    requestOfferComment,
    requestDeleteComment,
  };
};

export default useComment;