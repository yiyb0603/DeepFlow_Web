import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const tagQuestionState = atom<IQuestion[]>({
  key: 'tagQuestionState',
  default: [] as IQuestion[],
});