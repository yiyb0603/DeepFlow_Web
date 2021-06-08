import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import EmojiInput from '../EmojiInput';
import useControlEmoji from 'hooks/commentEmoji/useControlEmoji';

const style = require('./EmojiSelect.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmojiSelectProps {
  commentIdx: number;
}

const EmojiSelect = ({
  commentIdx,
}: EmojiSelectProps): JSX.Element => {
  const {
    emoji,
    onChangeEmoji,
    onClickEmoji,
    onKeydownEmoji,
    selectRef,
    findExistEmoji,
    emojiIcons,
  } = useControlEmoji(commentIdx);

  return (
    <div className={cx('EmojiSelect')} ref={selectRef}>
      <EmojiInput
        commentIdx={commentIdx}
        emoji={emoji}
        onChangeEmoji={onChangeEmoji}
        onKeydownEmoji={onKeydownEmoji}
        findExistEmoji={findExistEmoji}
      />

      {
        emojiIcons && emojiIcons.map((emoji: string, idx: number) => (
          <div
            key={idx}
            className={cx('EmojiSelect-Emoji', {
              'EmojiSelect-Emoji-Selected': findExistEmoji(emoji) !== undefined,
            })}
            onClick={() => onClickEmoji(emoji, commentIdx, findExistEmoji(emoji))}
          >
            {emoji}
          </div>
        ))
      }
    </div>
  );
};

export default EmojiSelect;
