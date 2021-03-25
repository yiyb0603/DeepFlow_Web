import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { commentListState } from 'atom/comment';
import usePageParam from './util/usePageParam';
import { getCommentsByPostIdx } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';

const useCommentList = () => {
  const [commentList, setCommentList] = useRecoilState(commentListState);
  const postIdx: number = usePageParam();

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

  useEffect(() => {
    requestCommentList();
  }, [requestCommentList]);

  return {
    commentList,
  };
};

export default useCommentList;