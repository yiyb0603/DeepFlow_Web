import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { postState } from 'atom/post';
import Post from 'components/Post';
import { getPostByIdx } from 'lib/api/post/post.api';
import { IPageParam, IPost, IPostResponse } from 'types/post.types';
import PostError from 'error/PostError';

const PostContainer = (): JSX.Element => {
  const { idx }: IPageParam = useParams();
  const postIdx: number = parseInt(idx!);
  const history: History<unknown> = useHistory();

  const [post, setPost] = useRecoilState<IPost | null>(postState);

  const requestPostByIdx = useCallback(async (): Promise<void> => {
    try {
      const { status, data }: IPostResponse = await getPostByIdx(postIdx);
      
      if (status === 200) {
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

  return (
    <>
    {
      post === null ? <></> : <Post post={post} />
    }
    </>
  );
};

export default PostContainer;