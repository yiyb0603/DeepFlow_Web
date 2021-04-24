import { IPostDto } from 'lib/api/post/post.dto';
import { atom } from 'recoil';
import { IPost } from 'types/post.types';

export const postListLoadingState = atom<boolean>({
  key: 'postListLoadingState',
  default: true,
});

export const recentPostLoading = atom<boolean>({
  key: 'recentPostLoading',
  default: true,
});

export const postState = atom<IPost | null>({
  key: 'postState',
  default: null,
});

export const questionListState = atom<IPost[]>({
  key: 'questionListState',
  default: [] as IPost[],
});

export const recentPostState = atom<IPost[]>({
  key: 'recentPostState',
  default: [] as IPost[],
});

export const popularPostState = atom<IPost[]>({
  key: 'popularPostState',
  default: [] as IPost[],
});

export const tempPostState = atom<IPost[]>({
  key: 'tempPostState',
  default: [] as IPost[],
});

export const tagPostState = atom<IPost[]>({
  key: 'tagPostState',
  default: [] as IPost[],
});

export const requestPostState = atom<IPostDto>({
  key: 'requestPostState',
  default: {
    title: '',
    introduction: '',
    thumbnail: '',
    contents: '',
    postTags: [],
  },
});