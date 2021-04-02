import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./CommentSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentSubmitProps {
  requestCreateComment: () => void;
}

const CommentSubmit = ({
  requestCreateComment,
}: CommentSubmitProps) => {
  return (
    <div className={cx('CommentSubmit')}>
      <button
        className={cx('CommentSubmit-Button')}
        onClick={requestCreateComment}
      >
        Comment
      </button>
    </div>
  );
};

export default CommentSubmit;
