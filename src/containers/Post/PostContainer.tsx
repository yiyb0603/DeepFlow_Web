import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import Post from 'components/Post';
import { deletePost } from 'lib/api/post/post.api';
import { IResponse } from 'types/Response';
import { successToast } from 'lib/Toast';
import { EResponse } from 'lib/enum/response';
import usePostByIdx from 'hooks/usePostByIdx';

const PostContainer = (): JSX.Element => {
  const history: History<unknown> = useHistory();
  const { post } = usePostByIdx();

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