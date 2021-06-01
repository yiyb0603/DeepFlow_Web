import { selectorFamily } from 'recoil';
import { getUserPosts } from 'lib/api/question/question.api';
import { getUserInfo, getUserList } from 'lib/api/user/user.api';
import { EUserQuestion } from 'lib/enum/question';
import { EUserSort } from 'lib/enum/user';
import { IQuestionListResponse } from 'types/question.types';
import { IUser } from 'types/user.types';

export const userListSelector = selectorFamily<IUser[], EUserSort>({
  key: 'userListSelector',
  get: (sort: EUserSort) => async () => {
    const { data: { users } } = await getUserList(sort);
    return users;
  },
});

export const userInfoSelector = selectorFamily<IUser | null, number | null>({
  key: 'userInfoSelector',
  get: (userIdx: number | null) => async () => {
    if (userIdx === null) {
      return null;
    }

    const { data: { user } } = await getUserInfo(userIdx!);
    return user;
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