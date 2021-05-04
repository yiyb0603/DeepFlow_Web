import { IQuestionDto } from 'lib/api/question/question.dto';
import { atom } from 'recoil';
import { IQuestion } from 'types/question.types';

export const questionListLoadingState = atom<boolean>({
  key: 'postListLoadingState',
  default: true,
});

export const recentQuestionLoading = atom<boolean>({
  key: 'recentPostLoading',
  default: true,
});

export const questionState = atom<IQuestion | null>({
  key: 'postState',
  default: null,
});

export const questionListState = atom<IQuestion[]>({
  key: 'questionListState',
  default: [] as IQuestion[],
});

export const recentQuestionState = atom<IQuestion[]>({
  key: 'recentPostState',
  default: [] as IQuestion[],
});

export const popularQuestionState = atom<IQuestion[]>({
  key: 'popularPostState',
  default: [] as IQuestion[],
});

export const tempQuestionState = atom<IQuestion[]>({
  key: 'tempPostState',
  default: [] as IQuestion[],
});

export const tagQuestionState = atom<IQuestion[]>({
  key: 'tagPostState',
  default: [] as IQuestion[],
});

export const initialRequestQuestionState = {
  title: '',
  introduction: '',
  thumbnail: '',
  contents: '',
  postTags: [],
};

export const requestPostState = atom<IQuestionDto>({
  key: 'requestPostState',
  default: initialRequestQuestionState,
});