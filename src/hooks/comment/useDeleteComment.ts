import { useCallback } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { commentModifyState } from 'atom/comment';
import { deleteComment } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import usePageParam from 'hooks/util/usePageParam';
import { ICommentModify } from 'types/comment.types';
import useCommentList from './useCommentList';

const useDeleteComment = () => {
  const { requestCommentList } = useCommentList();

  const postIdx: number = usePageParam();
  const setModifyObject: SetterOrUpdater<ICommentModify | null> = useSetRecoilState<ICommentModify | null>(commentModifyState);

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
    requestDeleteComment,
  };
}

export default useDeleteComment;