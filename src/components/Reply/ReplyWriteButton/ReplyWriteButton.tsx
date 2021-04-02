import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ReplyWriteButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyWriteButtonProps {
  onChangeIsReplyWrite: () => void;
}

const ReplyWriteButton = ({
  onChangeIsReplyWrite,
}: ReplyWriteButtonProps): JSX.Element => {
  return (
    <button
      className={cx('ReplyWriteButton')}
      onClick={onChangeIsReplyWrite}
    >
      답글 작성
    </button>
  );
};

export default ReplyWriteButton;
