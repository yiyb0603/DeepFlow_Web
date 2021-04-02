import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import useReply from 'hooks/useReply';
import { groupingState } from 'converter/groupingState';
import { EComment } from 'lib/enum/comment';
import CommentForm from 'components/Common/Comment/CommentForm';
import { createReply, modifyReply } from 'lib/api/reply/reply.api';
import { IReplyDto } from 'lib/api/reply/reply.dto';
import usePageParam from 'hooks/util/usePageParam';
import useComment from 'hooks/useComment';
import { modifyReplyState } from 'atom/reply';
import { IReplyModify } from 'types/reply.types';
import { EResponse } from 'lib/enum/response';

interface ReplyFormContainerProps {
  onChangeIsReplyWrite: () => void;
  commentIdx: number;
}

const ReplyFormContainer = ({
  onChangeIsReplyWrite,
  commentIdx,
}: ReplyFormContainerProps): JSX.Element => {
  const postIdx: number = usePageParam();

  const { requestCommentList } = useComment();
  const { contents, setContents, onChangeContents } = useReply();

  const [modifyObject, setModifyObject] = useRecoilState<IReplyModify | null>(modifyReplyState);

  const requestOfferReply = useCallback(async (): Promise<void> => {
    try {
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

      setContents('');
      await requestCommentList();
    } catch (error) {
      console.log(error);
    }
  }, [commentIdx, contents, modifyObject, postIdx, requestCommentList, setContents, setModifyObject]);

  return (
    <CommentForm
      contentsState={groupingState('contents', contents, onChangeContents)}
      type={EComment.REPLY}
      onChangeIsReplyWrite={onChangeIsReplyWrite}
      requestOfferComment={requestOfferReply}
    />
  )
};

export default ReplyFormContainer;