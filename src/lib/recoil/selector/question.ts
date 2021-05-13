import { getPostsBySort } from 'lib/api/question/question.api';
import { EQuestionSort } from 'lib/enum/question';
import { selectorFamily } from 'recoil';
import { IQuestionListResponse } from 'types/question.types';

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