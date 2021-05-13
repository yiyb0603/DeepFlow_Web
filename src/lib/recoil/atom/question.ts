import { IQuestionDto } from 'lib/api/question/question.dto';
import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const questionListLoadingState = atom<boolean>({
  key: 'questionListLoadingState',
  default: true,
});

export const recentQuestionLoading = atom<boolean>({
  key: 'recentQuestionLoading',
  default: true,
});

export const questionState = atom<IQuestion | null>({
  key: 'questionState',
  default: null,
});

export const questionListState = atom<IQuestion[]>({
  key: 'questionListState',
  default: [] as IQuestion[],
});

export const recentQuestionState = atom<IQuestion[]>({
  key: 'recentQuestionState',
  default: [] as IQuestion[],
});

export const popularQuestionState = atom<IQuestion[]>({
  key: 'popularQuestionState',
  default: [] as IQuestion[],
});

export const tempQuestionState = atom<IQuestion[]>({
  key: 'tempQuestionState',
  default: [] as IQuestion[],
});

export const tagQuestionState = atom<IQuestion[]>({
  key: 'tagQuestionState',
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