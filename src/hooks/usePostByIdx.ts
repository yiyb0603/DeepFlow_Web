import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { postState } from 'atom/post';
import { IPageParam, IPost, IPostResponse } from 'types/post.types';
import { getPostByIdx } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import PostError from 'error/PostError';

const usePostByIdx = () => {
  const history: History<unknown> = useHistory();
  const { idx }: IPageParam = useParams();

  const postIdx: number = parseInt(idx!);
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