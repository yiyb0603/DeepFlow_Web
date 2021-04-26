import { useCallback, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isShowReplyState, modifyReplyState, replyContents } from 'atom/reply';
import { IReplyDto } from 'lib/api/reply/reply.dto';
import { EResponse } from 'lib/enum/response';
import { createReply, deleteReply, modifyReply } from 'lib/api/reply/reply.api';
import { IReplyModify } from 'types/reply.types';
import useComment from '../comment/useComment';
import usePageParam from '../util/usePageParam';
import { validateReply } from 'validation/reply.validation';

const useReply = (commentIdx: number) => {
  const { requestCommentList } = useComment();
  const postIdx: number = usePageParam();

  const setIsShowReply = useSetRecoilState<boolean>(isShowReplyState);
  const [contents, setContents] = useRecoilState<string>(replyContents);
  const [modifyObject, setModifyObject] = useRecoilState<IReplyModify | null>(modifyReplyState);

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContents(value);
  }, [setContents]);

  const requestOfferReply = useCallback(async (): Promise<void> => {
    try {
      if (!validateReply(contents)) {
        return;
      }

      const replyDto: IReplyDto = {
        contents,
        commentIdx,
        postIdx,
      }

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
    
    requestOfferReply,
    requestDeleteReply,
  };
}

export default useReply;