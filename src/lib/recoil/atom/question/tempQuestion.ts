import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const tempQuestionState = atom<IQuestion[]>({
  key: 'tempQuestionState',
  default: [] as IQuestion[],
});