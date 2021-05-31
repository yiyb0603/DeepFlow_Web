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

export const userInfoSelector = selectorFamily<IUserResponse | null, number | null>({
  key: 'userInfoSelector',
  get: (userIdx: number | null) => async () => {
    if (userIdx === null) {
      return null;
    }

    const data = await getUserInfo(userIdx!);
    return data;
  },
});

type userQuestionSelectorParam = {
  userIdx: number | null;
  userPostTab: EUserQuestion;
}

export const userQuestionSelector = selectorFamily<IQuestionListResponse | null, userQuestionSelectorParam>({
  key: 'userQuestionSelector',
  get: ({ userIdx, userPostTab }: userQuestionSelectorParam) => async () => {
    if (userIdx !== null) {
      const data = await getUserPosts(userIdx, userPostTab);
      return data;
    } else {
      return null;
    }
  },
});