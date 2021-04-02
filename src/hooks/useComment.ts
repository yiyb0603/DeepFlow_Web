import { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentListState } from 'atom/comment';
import usePageParam from './util/usePageParam';
import { createComment, getCommentsByPostIdx } from 'lib/api/comment/comment.api';
import { EResponse } from 'lib/enum/response';
import { IComment } from 'types/comment.types';
import { ICommentDto } from 'lib/api/comment/comment.dto';

const useComment = () => {
  const postIdx: number = usePageParam();
  const [commentList, setCommentList] = useRecoilState<IComment[]>(commentListState);
  const [contents, setContents] = useState<string>('');

  const onChangeContents = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;
    setContents(value);
  }, []);

  const requestCommentList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { comments } } = await getCommentsByPostIdx(postIdx);

      if (status === EResponse.OK) {
        setCommentList(comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postIdx, setCommentList]);

  const requestCreateComment = useCallback(async (): Promise<void> => {
    try {
      const commentDto: ICommentDto = {
        postIdx,
        contents,
      }
      const { status } = await createComment(commentDto);

      if (status === EResponse.OK) {
        setContents('');
        requestCommentList();
      }
    } catch (error) {
      console.log(error);
    }
  }, [contents, postIdx, requestCommentList]);

  return {
    contents,
    onChangeContents,

    commentList,
    requestCommentList,

    requestCreateComment,
  };
};

export default useComment;