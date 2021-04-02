import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ReplyCancel.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyCancelProps {
  onChangeIsReplyWrite: () => void;
}

const ReplyCancel = ({
  onChangeIsReplyWrite,
}: ReplyCancelProps): JSX.Element => {
  return (
    <button
      className={cx('ReplyCancel')}
      onClick={onChangeIsReplyWrite}
    >
      취소
    </button>
  );
};

export default ReplyCancel;
