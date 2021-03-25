import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { postState } from 'atom/post';
import { IPost, IPostResponse } from 'types/post.types';
import { getPostByIdx } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import PostError from 'error/PostError';
import usePageParam from './util/usePageParam';

const usePostByIdx = () => {
  const history: History<unknown> = useHistory();
  const postIdx: number = usePageParam();
  const [post, setPost] = useRecoilState<IPost | null>(postState);

  const requestPostByIdx = useCallback(async (): Promise<void> => {
    try {
      const { status, data }: IPostResponse = await getPostByIdx(postIdx);
      
      if (status === EResponse.OK) {
        setPost(data.post);
      }
    } catch (error) {
      new PostError(error).getPostError(history);
    }
  }, [history, postIdx, setPost]);

  useEffect(() => {
    if (Number.isInteger(postIdx)) {
      requestPostByIdx();
    }
  }, [postIdx, requestPostByIdx]);

  return {
    post,
  };
};

export default usePostByIdx;