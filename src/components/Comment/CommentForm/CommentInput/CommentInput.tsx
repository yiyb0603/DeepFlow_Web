import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./CommentInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentInput = (): JSX.Element => {
  return (
    <div className={cx('CommentInput')}>
      <textarea
        placeholder='댓글을 입력해주세요.'
        className={cx('CommentInput-Input')}
      ></textarea>
    </div>
  );
};

export default CommentInput;