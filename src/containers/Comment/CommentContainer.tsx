import { useCallback, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { commentContentsState, modifyState } from 'atom/comment';
import useCommentList from 'hooks/useComment';
import Comment from 'components/Comment';
import { ICommentModify } from 'types/comment.types';

const CommentContainer = (): JSX.Element => {
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const setModifyState = useSetRecoilState<ICommentModify | null>(modifyState);
  const setContents = useSetRecoilState<string>(commentContentsState);
  const { commentList, requestCommentList, requestDeleteComment } = useCommentList();

  const onModifyClick = useCallback((idx: number, contents: string): void => {
    setModifyState({
      idx,
      contents,
    });
    setContents(contents);
    
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [setContents, setModifyState]);

  useEffect(() => {
    requestCommentList();
  }, [requestCommentList]);

  return (
    <Comment
      commentList={commentList}
      commentInputRef={commentInputRef}
      onModifyClick={onModifyClick}
      requestDeleteComment={requestDeleteComment}
    />
  );
}

export default CommentContainer;