import { useEffect } from 'react';
import useCommentList from 'hooks/useComment';
import Comment from 'components/Comment';

const CommentContainer = (): JSX.Element => {
  const { commentList, requestCommentList } = useCommentList();

  useEffect(() => {
    requestCommentList();
  }, [requestCommentList]);

  return (
    <Comment
      commentList={commentList}
    />
  );
}

export default CommentContainer;