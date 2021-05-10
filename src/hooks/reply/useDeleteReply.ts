import { useCallback } from 'react';
import useCommentList from 'hooks/comment/useCommentList';
import { deleteReply } from 'lib/api/reply/reply.api';
import { EResponse } from 'lib/enum/response';

const useDeleteReply = () => {
  const { requestCommentList } = useCommentList();

  const requestDeleteReply = useCallback(async (replyIdx: number): Promise<void> => {
    try {
      const { status } = await deleteReply(replyIdx);

      if (status === EResponse.OK) {
        await requestCommentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestCommentList]);

  return {
    requestDeleteReply
  }
}

export default useDeleteReply;