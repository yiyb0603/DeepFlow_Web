import CommentForm from 'components/Comment/CommentForm';
import { groupingState } from 'converter/groupingState';
import useComment from 'hooks/useComment';

const CommentFormContainer = () => {
  const { contents, onChangeContents, requestCreateComment } = useComment();

  return (
    <CommentForm
      contentsState={groupingState('contents', contents, onChangeContents)}
      requestCreateComment={requestCreateComment}
    />
  );
}

export default CommentFormContainer;