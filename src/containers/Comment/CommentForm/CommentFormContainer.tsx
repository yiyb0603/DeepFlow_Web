import { MutableRefObject } from 'react';
import useComment from 'hooks/useComment';
import { groupingState } from 'converter/groupingState';
import CommentForm from 'components/Common/Comment/CommentForm';
import { EComment } from 'lib/enum/comment';

interface CommentFormContainerProps {
  commentInputRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const CommentFormContainer = ({
  commentInputRef,
}: CommentFormContainerProps) => {
  const { contents, onChangeContents, requestOfferComment } = useComment();

  return (
    <CommentForm
      contentsState={groupingState('contents', contents, onChangeContents)}
      commentInputRef={commentInputRef}
      requestOfferComment={requestOfferComment}
      type={EComment.COMMENT}
    />
  );
}

export default CommentFormContainer;