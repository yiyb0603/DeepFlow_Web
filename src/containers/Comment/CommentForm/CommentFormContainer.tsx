import { MutableRefObject } from 'react';
import useComment from 'hooks/useComment';
import CommentForm from 'components/Comment/CommentForm';
import { groupingState } from 'converter/groupingState';

interface CommentFormContainerProps {
  commentInputRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const CommentFormContainer = ({
  commentInputRef,
}: CommentFormContainerProps) => {
  const { contents, setContents, onChangeContents, requestOfferComment } = useComment();

  return (
    <CommentForm
      contentsState={groupingState('contents', contents, onChangeContents)}
      commentInputRef={commentInputRef}
      requestOfferComment={requestOfferComment}
    />
  );
}

export default CommentFormContainer;