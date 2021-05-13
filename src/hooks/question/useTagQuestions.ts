import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { questionListLoadingState, tagQuestionState } from 'lib/recoil/atom/question';
import { CHUNK_POST_COUNT } from 'constants/util';
import { getPostsByTag } from 'lib/api/question/question.api';
import { EResponse } from 'lib/enum/response';
import { IQuestion } from 'types/question.types';
import usePagination from 'hooks/util/usePagination';
import { chunkArray } from 'util/chunkArray';

const useTagQuestions = () => {
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

  const [questionLoading, setQuestionState] = useRecoilState<boolean>(questionListLoadingState);
  const [tagQuestionList, setTagQuestionList] = useRecoilState<IQuestion[]>(tagQuestionState);

  const splitedQuestionList: IQuestion[][] = useMemo(() => {
    return chunkArray(tagQuestionList, CHUNK_POST_COUNT) as IQuestion[][];
  }, [tagQuestionList]);

  const requestPostsByTag = useCallback(async (): Promise<void> => {
    try {
      setQuestionState(true);
      const { status, data: { posts } } = await getPostsByTag(tag);

      if (status === EResponse.OK) {
        setTagQuestionList(posts);
        setTotalPage(Math.ceil(posts.length / CHUNK_POST_COUNT));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setQuestionState(false);
    }
  }, [setQuestionState, setTagQuestionList, setTotalPage, tag]);

  return {
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    splitedQuestionList,

    questionLoading,
    tagQuestionList,
    requestPostsByTag,
  };
}

export default useTagQuestions;