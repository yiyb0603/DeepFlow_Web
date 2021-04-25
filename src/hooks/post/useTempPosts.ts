import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { postListLoadingState, tempPostState } from 'atom/post';
import { getTempPosts } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { IPost } from 'types/post.types';

const useTempPosts = () => {
  const [tempPosts, setTempPosts] = useRecoilState<IPost[]>(tempPostState);
  const [postLoading, setPostLoading] = useRecoilState<boolean>(postListLoadingState);

  const requestTempPosts = useCallback(async (): Promise<void> => {
    try {
      setPostLoading(true);
      const { status, data: { posts } } = await getTempPosts();

      if (status === EResponse.OK) {
        setTempPosts(posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [setPostLoading, setTempPosts]);

  return {
    tempPosts,
    postLoading,
    requestTempPosts,
  }
};

export default useTempPosts;