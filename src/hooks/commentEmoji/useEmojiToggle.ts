import { useCallback, useEffect } from 'react';
import { useRecoilState, SetterOrUpdater, useSetRecoilState } from 'recoil';
import { commentEmojiListState } from 'lib/recoil/atom/comment';
import { toggleEmojiState, emojiCommentIdxState } from 'lib/recoil/atom/commentEmoji';
import { ICommentEmoji, ICommentEmojiInfo } from 'types/commentEmoji.types';

const useEmojiToggle = (commentIdx: number, emojies: ICommentEmoji[]) => {
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

  return {
    isToggle,
    commentIdxState,
    onChangeIsToggle,
  };
};

export default useEmojiToggle;