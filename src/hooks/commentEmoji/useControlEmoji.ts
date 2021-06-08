import { useState, useCallback, useEffect, useMemo, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { SetterOrUpdater, useSetRecoilState, useRecoilValue } from 'recoil';
import { commentEmojiListState } from 'lib/recoil/atom/comment';
import { toggleEmojiState, emojiIconListState } from 'lib/recoil/atom/commentEmoji';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { IToken } from 'types/user.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { getMyInfo } from 'util/getMyInfo';
import useCreateEmoji from './useCreateEmoji';
import useDeleteEmoji from './useDeleteEmoji';

const useControlEmoji = (commentIdx: number) => {
  const { requestCreateEmoji } = useCreateEmoji();
  const { requestDeleteEmoji } = useDeleteEmoji();

  const [emoji, setEmoji] = useState<string>('');
  const selectRef = useRef<HTMLDivElement>(null);
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

  const onChangeEmoji = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setEmoji(value);
  }, []);

  const onClickEmoji = useCallback((
    emoji: string, 
    commentIdx: number,
    existEmoji?: ICommentEmojiInfo | undefined
  ): void => {
    if (!checkLoggedIn()) {
      return;
    }

    setEmoji(emoji);

    if (existEmoji === undefined) {
      requestCreateEmoji(emoji, commentIdx);
    } else {
      requestDeleteEmoji(existEmoji!.idx, commentIdx, emoji);
    }

    setEmoji('');
  }, [requestCreateEmoji, requestDeleteEmoji]);

  const onKeydownEmoji = useCallback((
    { key }: KeyboardEvent<HTMLInputElement>,
    commentIdx: number,
    existEmoji?: ICommentEmojiInfo | undefined,
  ): void => {
    if (key === 'Enter') {
      onClickEmoji(emoji, commentIdx, existEmoji);
    }
  }, [emoji, onClickEmoji]);

  useEffect(() => {
    document.addEventListener('click', handleClickOut, true);
    
    return () => document.removeEventListener('click', handleClickOut, true);
  }, [handleClickOut]);

  return {
    emoji,
    onChangeEmoji,
    onClickEmoji,
    onKeydownEmoji,

    selectRef,
    findExistEmoji,
    emojiIcons,
  };
}

export default useControlEmoji;