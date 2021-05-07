import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { commentEmojiListState } from 'atom/comment';
import { toggleEmojiState } from 'atom/commentEmoji';
import { ICommentEmojiDto } from 'lib/api/commentEmoji/commentEmoji.dto';
import { createCommentEmoji, deleteCommentEmoji } from 'lib/api/commentEmoji/commentEmoji.api';
import { EResponse } from 'lib/enum/response';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import useComment from './useComment';

const useEmoji = () => {
  const { requestCommentList } = useComment();
  const [emoji, setEmoji] = useState<string>('');

  const setIsToggle: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(toggleEmojiState);
  const setUserEmojies = useSetRecoilState<ICommentEmojiInfo[]>(commentEmojiListState);

  const requestCreateEmoji = useCallback(async (emoji: string, commentIdx: number): Promise<void> => {
    try {
      const createEmojiDto: ICommentEmojiDto = {
        emoji,
        commentIdx,
      };

      const { status } = await createCommentEmoji(createEmojiDto);

      if (status === EResponse.OK) {
        setIsToggle(false);
        await requestCommentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestCommentList, setIsToggle]);

  const requestDeleteEmoji = useCallback(async (emojiIdx: number, commentIdx: number, emoji: string): Promise<void> => {
    try {
      const { status } = await deleteCommentEmoji(emojiIdx);

      if (status === EResponse.OK) {
        await requestCommentList();
        setUserEmojies((prevUserEmojis: ICommentEmojiInfo[]) => (
          prevUserEmojis.filter((userEmoji: ICommentEmojiInfo) => (
            userEmoji.emoji !== emoji && userEmoji.fk_comment_idx !== commentIdx
          ))
        ));
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestCommentList, setUserEmojies]);

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

  return {
    emoji,
    onChangeEmoji,
    onKeydownEmoji,
    onClickEmoji,
    requestCreateEmoji,
    requestDeleteEmoji,
  };
}

export default useEmoji;