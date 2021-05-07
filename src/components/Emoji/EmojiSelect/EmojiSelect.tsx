import { useCallback, useEffect, useMemo, useRef } from 'react';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentEmojiListState } from 'atom/comment';
import { emojiIconListState, toggleEmojiState } from 'atom/commentEmoji';
import useEmoji from 'hooks/comment/useEmoji';
import { IToken } from 'types/user.types';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { getMyInfo } from 'util/getMyInfo';
import EmojiInput from '../EmojiInput';

const style = require('./EmojiSelect.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmojiSelectProps {
  commentIdx: number;
}

const EmojiSelect = ({
  commentIdx,
}: EmojiSelectProps): JSX.Element => {
  const { emoji, onChangeEmoji, onClickEmoji, onKeydownEmoji } = useEmoji();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  const setIsToggle: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(toggleEmojiState);
  const userEmojies: ICommentEmojiInfo[] = useRecoilValue<ICommentEmojiInfo[]>(commentEmojiListState);
  const emojiIcons: string[] = useRecoilValue<string[]>(emojiIconListState);

  const findExistEmoji = useCallback((emoji: string): ICommentEmojiInfo | undefined => {
    const existEmoji = userEmojies.find((emojies: ICommentEmojiInfo) => {
      return (emojies.emoji === emoji)
        && (emojies.user.idx === (myInfo && myInfo.idx))
        && emojies.fk_comment_idx === commentIdx;
    });

    return existEmoji;
  }, [commentIdx, myInfo, userEmojies]);

  const handleClickOut = useCallback((e): void => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      e.stopPropagation();
      setIsToggle(false);
    }
  }, [setIsToggle]);

  useEffect(() => {
    document.addEventListener('click', handleClickOut, true);
    
    return () => document.removeEventListener('click', handleClickOut, true);
  }, [handleClickOut]);

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
