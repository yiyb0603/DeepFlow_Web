import { selectorFamily } from 'recoil';
import { getPopularPosts, getPostsBySort, getRecentPosts } from 'lib/api/question/question.api';
import { EQuestionSort } from 'lib/enum/question';
import { IQuestion, IQuestionListResponse } from 'types/question.types';

type questionListSelectorParam = {
  sort: EQuestionSort;
  page: number;
}

export const questionListSelector = selectorFamily<IQuestionListResponse, questionListSelectorParam>({
  key: 'questionListSelector',
  get: ({ sort, page }: questionListSelectorParam) => async () => {
    const data = await getPostsBySort(sort, page);
    return data;
  },
});

export const popularQuestionSelector = selectorFamily<IQuestion[], number>({
  key: 'popularQuestionSelector',
  get: (count: number) => async () => {
    const { data: { popularPosts } } = await getPopularPosts(count);
    return popularPosts;
  },
});

export const recentQuestionSelector = selectorFamily<IQuestion[], number>({
  key: 'recentQuestionSelector',
  get: (count: number) => async () => {
    const { data: { recentPosts } } = await getRecentPosts(count);
    return recentPosts;
  },
});