import { atom } from 'recoil';
import { IQuestionDto } from 'lib/api/question/question.dto';
import { IQuestion } from 'types/question.types';

export const questionListLoadingState = atom<boolean>({
  key: 'questionListLoadingState',
  default: false,
});

export const questionMountedState = atom<boolean>({
  key: 'questionMountedState',
  default: false,
});

export const questionState = atom<IQuestion | null>({
  key: 'questionState',
  default: null,
});

export const questionListState = atom<IQuestion[]>({
  key: 'questionListState',
  default: [] as IQuestion[],
});

export const initialRequestQuestionState = {
  title: '',
  introduction: '',
  thumbnail: '',
  contents: '',
  postTags: [],
};

export const requestQuestionState = atom<IQuestionDto>({
  key: 'requestQuestionState',
  default: initialRequestQuestionState,
});