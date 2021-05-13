import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { commentEmojiListState } from 'lib/recoil/atom/comment';
import useCommentList from 'hooks/comment/useCommentList';
import { deleteCommentEmoji } from 'lib/api/commentEmoji/commentEmoji.api';
import { EResponse } from 'lib/enum/response';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';

const useDeleteEmoji = () => {
  const { requestCommentList } = useCommentList();
  const setUserEmojies = useSetRecoilState<ICommentEmojiInfo[]>(commentEmojiListState);

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

  return {
    requestDeleteEmoji,
  };
}

export default useDeleteEmoji;