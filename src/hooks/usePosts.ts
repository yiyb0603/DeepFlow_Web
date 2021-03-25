import { useCallback, useEffect, useState } from 'react';
import { getPostsByCategory } from 'lib/api/post/post.api';
import { EPost } from 'lib/enum/post';
import { EResponse } from 'lib/enum/response';
import { useRecoilState } from 'recoil';
import { questionListState } from 'atom/post';
import { IPost } from 'types/post.types';

const usePosts = (category: EPost) => {
  const [page, setPage] = useState<number>(1);
  const [questionList, setQuestionList] = useRecoilState<IPost[]>(questionListState);

  const requestPostList = useCallback(async () => {
    try {
      const { status, data: { posts } } = await getPostsByCategory(category, page);

      if (status === EResponse.OK) {
        setQuestionList(posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, page, setQuestionList]);

  useEffect(() => {
    requestPostList();
  }, [requestPostList]);

  return {
    questionList,
  };
}

export default usePosts;