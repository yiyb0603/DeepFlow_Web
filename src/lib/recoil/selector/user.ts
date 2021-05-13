import { selectorFamily } from 'recoil';
import { getUserPosts } from 'lib/api/question/question.api';
import { getUserInfo, getUserList } from 'lib/api/user/user.api';
import { EUserQuestion } from 'lib/enum/question';
import { EUserSort } from 'lib/enum/user';
import { IQuestionListResponse } from 'types/question.types';
import { IUserListResponse, IUserResponse } from 'types/user.types';

export const userListSelector = selectorFamily<IUserListResponse, EUserSort>({
  key: 'userListSelector',
  get: (sort: EUserSort) => async () => {
    const data = await getUserList(sort);
    return data;
  },
});

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