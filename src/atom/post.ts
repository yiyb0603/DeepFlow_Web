import { IPostDto } from 'lib/api/post/post.dto';
import { EPost } from 'lib/enum/post';
import { atom } from 'recoil';
import { IPost } from 'types/post.types';

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

// menu: recent post list state
export const recentPostState = atom<IPost[]>({
  key: 'recentPostState',
  default: [] as IPost[],
});

export const popularPostState = atom<IPost[]>({
  key: 'popularPostState',
  default: [] as IPost[],
});

export const requestPostState = atom<IPostDto>({
  key: 'requestPostState',
  default: {
    title: '',
    introduction: '',
    thumbnail: '',
    category: EPost.QUESTION,
    contents: '',
    postTags: [],
  },
});