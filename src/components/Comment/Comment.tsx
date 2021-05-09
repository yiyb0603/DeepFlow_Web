import { useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useComment from 'hooks/comment/useComment';
import { IComment } from 'types/comment.types';
import CommentItem from '../Common/Comment/CommentItem';
import CommentForm from 'components/Common/Comment/CommentForm';
import { EComment } from 'lib/enum/comment';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Comment = (): JSX.Element => {
  const {
    commentList,
    requestCommentList,
    requestDeleteComment,
    onModifyClick,
  } = useComment();

  useEffect(() => {
    requestCommentList();
  }, [requestCommentList]);

  return (
    <div className={cx('Comment')}>
      <div className={cx('Comment-Count')}>
        {commentList.length}개의 댓글
      </div>

      <CommentForm
        type={EComment.COMMENT}
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