import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postListLoadingState, tagPostState } from 'atom/question';
import { CHUNK_POST_COUNT } from 'constants/util';
import { getPostsByTag } from 'lib/api/post/post.api';
import { EResponse } from 'lib/enum/response';
import { IPost } from 'types/post.types';
import usePagination from 'hooks/util/usePagination';
import { chunkArray } from 'util/chunkArray';

const useTagPosts = () => {
  const { tag }: { tag: string } = useParams();
  const {
    setTotalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePagination();

  const [postLoading, setPostLoading] = useRecoilState<boolean>(postListLoadingState);
  const [tagPostList, setTagPostList] = useRecoilState<IPost[]>(tagPostState);

  const splitedTempPosts: IPost[][] = useMemo(() => {
    return chunkArray(tagPostList, CHUNK_POST_COUNT) as IPost[][];
  }, [tagPostList]);

  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      setPostLoading(true);
      const { status, data: { posts } } = await getPostsByTag(tag);

      if (status === EResponse.OK) {
        setTagPostList(posts);
        setTotalPage(Math.ceil(posts.length / CHUNK_POST_COUNT));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  }, [setPostLoading, setTagPostList, setTotalPage, tag]);

  return {
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    splitedTempPosts,

    postLoading,
    tagPostList,
    requestPostsByTag,
  };
}

export default useTagPosts;