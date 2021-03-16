import { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { postState } from 'atom/post';
import Post from 'components/Post';
import { deletePost, getPostByIdx } from 'lib/api/post/post.api';
import { IPageParam, IPost, IPostResponse } from 'types/post.types';
import PostError from 'error/PostError';
import { IResponse } from 'types/Response';
import { successToast } from 'lib/Toast';

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

  const requestDeletePost = useCallback(async (postIdx: number): Promise<void> => {
    try {
      const { status }: IResponse = await deletePost(postIdx);

      if (status === 200) {
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

    return () => {
      setPost(null);
    }
  }, [postIdx, requestPostByIdx, setPost]);

  return (
    <>
    {
      post === null ? <></> :
      <Post
        post={post}
        requestDeletePost={requestDeletePost}
      />
    }
    </>
  );
};

export default PostContainer;