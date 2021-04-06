import { useCallback, useEffect } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscSmiley } from 'react-icons/vsc';
import EmojiSelect from '../EmojiSelect';
import { emojiCommentIdxState, toggleEmojiState } from 'atom/commentEmoji';
import { ICommentEmoji, ICommentEmojiInfo } from 'types/commentEmoji.types';
import { commentEmojiListState } from 'atom/comment';

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
  const [isToggle, setIsToggle] = useRecoilState<boolean>(toggleEmojiState);
  const [commentIdxState, setCommentIdxState] = useRecoilState<number>(emojiCommentIdxState);
  const setUserEmojies: SetterOrUpdater<ICommentEmojiInfo[]> = useSetRecoilState<ICommentEmojiInfo[]>(commentEmojiListState);

  const onChangeIsToggle = useCallback((): void => {
    setCommentIdxState(commentIdx);
    setIsToggle((prevToggle: boolean) => !prevToggle);
  }, [commentIdx, setCommentIdxState, setIsToggle]);

  useEffect(() => {
    emojies.map((emoji) => (
      setUserEmojies((prevEmojies) => prevEmojies.concat(emoji.users))
    ));
  }, [emojies, setUserEmojies]);

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
