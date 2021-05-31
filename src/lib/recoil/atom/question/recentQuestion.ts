import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const recentQuestionLoading = atom<boolean>({
  key: 'recentQuestionLoading',
  default: false,
});

export const recentQuestionMountedState = atom<boolean>({
  key: 'recentQuestionMountedState',
  default: false,
});

export const recentQuestionState = atom<IQuestion[]>({
  key: 'recentQuestionState',
  default: [] as IQuestion[],
});