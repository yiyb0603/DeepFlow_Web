import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';
import { IUser } from 'types/user.types';

export const userMountedState = atom<boolean>({
  key: 'userMountedState',
  default: true,
});

export const userInfoState = atom<IUser | null>({
  key: 'userInfoState',
  default: null,
});

export const userListState = atom<IUser[][]>({
  key: 'userListState',
  default: [] as IUser[][],
});

export const userSearchKeywordState = atom<string>({
  key: 'userSearchKeywordState',
  default: '',
});

export const userLoading = atom<boolean>({
  key: 'userLoading',
  default: true,
});

export const userQuestionState = atom<IQuestion[]>({
  key: 'userQuestionState',
  default: [] as IQuestion[],
});