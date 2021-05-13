import { getUserPosts } from 'lib/api/question/question.api';
import { getUserInfo } from 'lib/api/user/user.api';
import { EUserQuestion } from 'lib/enum/question';
import { selectorFamily } from 'recoil';
import { IQuestionListResponse } from 'types/question.types';
import { IUserResponse } from 'types/user.types';

export const userInfoSelector = selectorFamily<IUserResponse, number>({
  key: 'userInfoSelector',
  get: (userIdx: number) => async () => {
    const data = await getUserInfo(userIdx);
    return data;
  },
});

type userQuestionSelectorParam = {
  userIdx: number;
  userPostTab: EUserQuestion;
}

export const userQuestionSelector = selectorFamily<IQuestionListResponse, userQuestionSelectorParam>({
  key: 'userQuestionSelector',
  get: (param: userQuestionSelectorParam) => async ({ get }) => {
    const data = await getUserPosts(param.userIdx, param.userPostTab);
    return data;
  },
});