import { MutableRefObject } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentFormContainer from 'containers/Comment/CommentForm';
import { IComment } from 'types/comment.types';
import CommentItem from './CommentItem';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
  commentList: IComment[];
  commentInputRef: MutableRefObject<HTMLTextAreaElement | null>;
  onModifyClick: (idx: number, contents: string) => void;
  requestDeleteComment: (commentIdx: number) => Promise<void>;
}

const Comment = ({
  commentList,
  commentInputRef,
  onModifyClick,
  requestDeleteComment,
}: CommentProps): JSX.Element => {
  return (
    <div className={cx('Comment')}>
      <h3>{commentList.length}개의 댓글</h3>

      <CommentFormContainer
        commentInputRef={commentInputRef}
      />

      <div className={cx('Comment-List')}>
        {
          commentList.map((comment: IComment) => {
            const { idx, contents, createdAt, updatedAt, user} = comment;

            return (
              <CommentItem
                key={idx}
                idx={idx}
                contents={contents}
                createdAt={createdAt}
                updatedAt={updatedAt}
                user={user}
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
