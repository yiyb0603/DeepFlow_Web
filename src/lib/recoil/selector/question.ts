import { selectorFamily } from 'recoil';
import { getPopularPosts, getPostsBySort, getRecentPosts } from 'lib/api/question/question.api';
import { EQuestionSort } from 'lib/enum/question';
import { IPopularQuestionListResponse, IQuestionListResponse, IRecentPostListResponse } from 'types/question.types';

type questionListSelectorParam = {
  sort: EQuestionSort;
  page: number;
}

export const questionListSelector = selectorFamily<IQuestionListResponse, questionListSelectorParam>({
  key: 'questionListSelector',
  get: (param: any) => async () => {
    const data = await getPostsBySort(param.sort, param.page);
    return data;
  },
});

export const popularQuestionSelector = selectorFamily<IPopularQuestionListResponse, number>({
  key: 'popularQuestionSelector',
  get: (count: number) => async () => {
    const data = await getPopularPosts(count);
    return data;
  },
});

export const recentQuestionSelector = selectorFamily<IRecentPostListResponse, number>({
  key: 'recentQuestionSelector',
  get: (count: number) => async () => {
    const data = await getRecentPosts(count);
    return data;
  },
});