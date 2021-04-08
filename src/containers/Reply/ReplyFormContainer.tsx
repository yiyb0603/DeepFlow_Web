import useReply from 'hooks/useReply';
import { groupingState } from 'converter/groupingState';
import { EComment } from 'lib/enum/comment';
import CommentForm from 'components/Common/Comment/CommentForm';

interface ReplyFormContainerProps {
  commentIdx: number;
  onChangeIsReplyWrite: (isReplyWrite: boolean) => void;
}

const ReplyFormContainer = ({
  commentIdx,
  onChangeIsReplyWrite,
}: ReplyFormContainerProps): JSX.Element => {
  const { contents, onChangeContents, requestOfferReply } = useReply(commentIdx);

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