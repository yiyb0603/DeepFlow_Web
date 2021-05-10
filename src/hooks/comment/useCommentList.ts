import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { commentListState } from 'atom/comment';
import { emojiIconListState } from 'atom/commentEmoji';
import usePageParam from 'hooks/util/usePageParam';
import { getCommentsByPostIdx } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import { IComment } from 'types/comment.types';

const useCommentList = () => {
  const postIdx: number = usePageParam();
  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [iconEmojies, setIconEmojies] = useRecoilState<string[]>(emojiIconListState);
  
  const requestCommentList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { comments } } = await getCommentsByPostIdx(postIdx);

      if (status === EResponse.OK) {
        setCommentList(comments);

        for (const comment of comments) {
          for (const { emoji } of comment.emojies) {
            if (iconEmojies.includes(emoji)) {
              continue;
            }

            setIconEmojies((prevIconEmojies: string[]) => [...prevIconEmojies, emoji]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [iconEmojies, postIdx, setCommentList, setIconEmojies]);

  return {
    commentList,
    requestCommentList,
  };
}

export default useCommentList;