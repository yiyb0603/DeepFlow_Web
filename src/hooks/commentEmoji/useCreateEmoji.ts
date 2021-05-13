import { useCallback } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { toggleEmojiState } from 'lib/recoil/atom/commentEmoji';
import useCommentList from 'hooks/comment/useCommentList';
import { createCommentEmoji } from 'lib/api/commentEmoji/commentEmoji.api';
import { ICommentEmojiDto } from 'lib/api/commentEmoji/commentEmoji.dto';
import { EResponse } from 'lib/enum/response';
import { validateCommentEmoji } from 'validation/commentEmoji.validation';

const useCreateEmoji = () => {
  const { requestCommentList } = useCommentList();
  const setIsToggle: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(toggleEmojiState);

  const requestCreateEmoji = useCallback(async (emoji: string, commentIdx: number): Promise<void> => {
    try {
      if (!validateCommentEmoji(emoji)) {
        return;
      }

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

  return {
    requestCreateEmoji,
  };
}

export default useCreateEmoji;