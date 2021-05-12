import { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import useCreateEmoji from './useCreateEmoji';
import useDeleteEmoji from './useDeleteEmoji';

const useControlEmoji = () => {
  const { requestCreateEmoji } = useCreateEmoji();
  const { requestDeleteEmoji } = useDeleteEmoji();

  const [emoji, setEmoji] = useState<string>('');

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
    onClickEmoji,
    onKeydownEmoji,
  };
}

export default useControlEmoji;