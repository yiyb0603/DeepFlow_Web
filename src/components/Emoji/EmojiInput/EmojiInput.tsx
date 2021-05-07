import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Tooltip from 'components/Common/Tooltip';
import { ChangeEvent, KeyboardEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';

const style = require('./EmojiInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmojiInputProps {
  commentIdx: number;
  emoji: string;
  onChangeEmoji: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydownEmoji: (
    e: KeyboardEvent<HTMLInputElement>,
    commentIdx: number,
    existEmoji?: ICommentEmojiInfo | undefined,
  ) => void;
  findExistEmoji: (emoji: string) => ICommentEmojiInfo | undefined;
}

const EmojiInput = ({
  commentIdx,
  emoji,
  onChangeEmoji,
  onKeydownEmoji,
  findExistEmoji,
}: EmojiInputProps): JSX.Element => {
  return (
    <div className={cx('EmojiInput')}>
      <AiOutlineSearch
        className={cx('EmojiInput-Icon')}
      />

      <Tooltip
        title='엔터키를 눌러서 추가 / 삭제가 됩니다.'
        placement='bottom'
      >
        <input
          type='text'
          className={cx('EmojiInput-Input')}
          maxLength={2}
          value={emoji}
          onChange={onChangeEmoji}
          onKeyDown={
            (
              e: KeyboardEvent<HTMLInputElement>
            ) => onKeydownEmoji(e, commentIdx, findExistEmoji(emoji))
          }
          placeholder='이모지 입력'
        />
      </Tooltip>
    </div>
  );
};

export default EmojiInput;
