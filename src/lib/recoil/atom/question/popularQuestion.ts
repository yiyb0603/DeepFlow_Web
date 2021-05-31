import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const popularQuestionState = atom<IQuestion[]>({
  key: 'popularQuestionState',
  default: [] as IQuestion[],
});

export const popluarQuestionMountedState = atom<boolean>({
  key: 'popluarQuestionMountedState',
  default: false,
});