import { useCallback, useMemo, ChangeEvent } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { commentContentsState, commentFormLoadingState, commentListState, modifyState } from 'atom/comment';
import usePageParam from '../util/usePageParam';
import { createComment, deleteComment, getCommentsByPostIdx, modifyComment } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import { IComment, ICommentModify } from 'types/comment.types';
import { ICommentDto } from 'lib/api/comment/comment.dto';
import { getMyInfo } from 'util/getMyInfo';
import { IToken } from 'types/user.types';
import { errorToast } from 'lib/Toast';
import { validateComment } from 'validation/comment.validation';

const useComment = () => {
  const postIdx: number = usePageParam();
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  const setIsLoading: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(commentFormLoadingState);
  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [contents, setContents] = useRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(modifyState);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

  const requestCommentList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { comments } } = await getCommentsByPostIdx(postIdx);

      if (status === EResponse.OK) {
        setCommentList(comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postIdx, setCommentList]);

  const requestOfferComment = useCallback(async (): Promise<void> => {
    try {
      if (!myInfo) {
        errorToast('로그인 후 작성해주세요');
        return;
      }

      if (!validateComment(contents)) {
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
  }, [contents, modifyObject, myInfo, postIdx, requestCommentList, setContents, setIsLoading, setModifyObject]);

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