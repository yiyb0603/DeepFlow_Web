import { ChangeEvent, MutableRefObject } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EComment } from 'lib/enum/comment';

const style = require('./CommentInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentInputProps {
  type: EComment;

  contents: string;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  commentInputRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const CommentInput = ({
  type,
  contents,
  onChangeContents,
  commentInputRef,
}: CommentInputProps): JSX.Element => {
  return (
    <div className={cx('CommentInput')}>
      <textarea
        placeholder={`${type === EComment.COMMENT ? '댓글' : '답글'}을 입력해주세요.`}
        ref={commentInputRef}
        className={cx('CommentInput-Input')}
        value={contents}
        onChange={onChangeContents}
      ></textarea>
    </div>
  );
};

export default CommentInput;
