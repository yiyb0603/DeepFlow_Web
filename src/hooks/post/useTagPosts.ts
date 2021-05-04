import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { questionListLoadingState, tagQuestionState } from 'atom/question';
import { CHUNK_POST_COUNT } from 'constants/util';
import { getPostsByTag } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion } from 'types/question.types';
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

  const [postLoading, setPostLoading] = useRecoilState<boolean>(questionListLoadingState);
  const [tagPostList, setTagPostList] = useRecoilState<IQuestion[]>(tagQuestionState);

  const splitedTempPosts: IQuestion[][] = useMemo(() => {
    return chunkArray(tagPostList, CHUNK_POST_COUNT) as IQuestion[][];
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