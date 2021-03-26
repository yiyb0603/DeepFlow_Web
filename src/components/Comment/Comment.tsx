import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IComment } from 'types/comment.types';
import CommentItem from './CommentItem';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
  commentList: IComment[];
}

const Comment = ({ commentList }: CommentProps): JSX.Element => {
  return (
    <div className={cx('Comment')}>
      <h3>{commentList.length}개의 댓글</h3>

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
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Comment;
