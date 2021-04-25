import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postListLoadingState, tagPostState } from 'atom/post';
import { getPostsByTag } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { IPost } from 'types/post.types';
import usePagination from 'hooks/util/usePagination';

const useTagPosts = () => {
  const { tag }: { tag: string } = useParams();
  const { totalPage, setTotalPage } = usePagination();

  const [postLoading, setPostLoading] = useRecoilState<boolean>(postListLoadingState);
  const [tagPostList, setTagPostList] = useRecoilState<IPost[]>(tagPostState);

  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      setPostLoading(true);
      const { status, data: { posts, totalPage } } = await getPostsByTag(tag);

      if (status === EResponse.OK) {
        setTagPostList(posts);
        setTotalPage(totalPage!);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [setPostLoading, setTagPostList, setTotalPage, tag]);

  return {
    totalPage,
    postLoading,
    tagPostList,
    requestPostsByTag,
  };
}

export default useTagPosts;