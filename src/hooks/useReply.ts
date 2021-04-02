import { useCallback, ChangeEvent } from 'react';
import { deleteReply } from 'lib/api/reply/reply.api';
import { EResponse } from 'lib/enum/response';
import useComment from './useComment';
import { useRecoilState } from 'recoil';
import { replyContents } from 'atom/reply';

const useReply = () => {
  const { requestCommentList } = useComment();
  const [contents, setContents] = useRecoilState<string>(replyContents);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

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
    contents,
    setContents,
    onChangeContents,
    
    requestDeleteReply,
  };
}

export default useReply;