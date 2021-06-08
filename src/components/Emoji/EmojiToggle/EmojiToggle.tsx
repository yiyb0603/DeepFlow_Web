import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscSmiley } from 'react-icons/vsc';
import useEmojiToggle from 'hooks/commentEmoji/useEmojiToggle';
import { ICommentEmoji } from 'types/commentEmoji.types';
import EmojiSelect from '../EmojiSelect';

const style = require('./EmojiToggle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmojiToggleProps {
  commentIdx: number;
  emojies: ICommentEmoji[];
}

const EmojiToggle = ({
  commentIdx,
  emojies,
}: EmojiToggleProps): JSX.Element => {
  const {
    isToggle,
    commentIdxState,
    onChangeIsToggle,
  } = useEmojiToggle(commentIdx, emojies);

  return (
    <div className={cx('EmojiToggle')}>
      <VscSmiley
        className={cx('EmojiToggle-Toggle')}
        onClick={onChangeIsToggle}
      />

      {
        isToggle && commentIdxState === commentIdx &&
        <EmojiSelect commentIdx={commentIdx} />
      }
    </div>
  );
};

export default EmojiToggle;
