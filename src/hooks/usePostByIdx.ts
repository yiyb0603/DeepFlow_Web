import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { postState } from 'atom/post';
import { IPost, IPostResponse } from 'types/post.types';
import { deletePost, getPostByIdx } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import PostError from 'error/PostError';
import usePageParam from './util/usePageParam';
import { successToast } from 'lib/Toast';
import { IResponse } from 'types/Response';

const usePostByIdx = () => {
  const history: History = useHistory();
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

  const requestDeletePost = useCallback(async (postIdx: number): Promise<void> => {
    try {
      const { status }: IResponse = await deletePost(postIdx);

      if (status === EResponse.OK) {
        successToast('글을 삭제하였습니다.');
        history.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  }, [history]);

  useEffect(() => {
    if (Number.isInteger(postIdx)) {
      requestPostByIdx();
    }

    return () => setPost(null);
  }, [postIdx, requestPostByIdx, setPost]);

  return {
    post,
    requestDeletePost,
  };
};

export default usePostByIdx;