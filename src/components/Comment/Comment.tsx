import { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useComment from 'hooks/comment/useComment';
import { IComment, ICommentModify } from 'types/comment.types';
import CommentItem from '../Common/Comment/CommentItem';
import { commentContentsState, modifyState } from 'atom/comment';
import CommentForm from 'components/Common/Comment/CommentForm';
import { EComment } from 'lib/enum/comment';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Comment = (): JSX.Element => {
  const { commentList, requestDeleteComment } = useComment();
  
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const setModifyState = useSetRecoilState<ICommentModify | null>(modifyState);
  const setContents = useSetRecoilState<string>(commentContentsState);

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

  return (
    <div className={cx('Comment')}>
      <h3>{commentList.length}개의 댓글</h3>

      <CommentForm
        type={EComment.COMMENT}
        commentInputRef={commentInputRef}
      />

      <div className={cx('Comment-List')}>
        {
          commentList.map((comment: IComment) => {
            const { idx, contents, createdAt, updatedAt, user, replies, emojies } = comment;

            return (
              <CommentItem
                key={idx}
                idx={idx}
                contents={contents}
                createdAt={createdAt}
                updatedAt={updatedAt}
                user={user}
                replies={replies}
                emojies={emojies}
                onModifyClick={onModifyClick}
                requestDeleteComment={requestDeleteComment}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Comment;