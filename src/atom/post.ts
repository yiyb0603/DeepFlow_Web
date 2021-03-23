import { IPostDto } from "lib/api/post/post.dto";
import { EPost } from "lib/enum/post";
import { atom } from "recoil";
import { IPost } from "types/post.types";

export const postState = atom<IPost | null>({
  key: 'postState',
  default: null,
});

// menu: recent post list state
export const recentPostState = atom<IPost[]>({
  key: 'recentPostState',
  default: [] as IPost[],
});

export const requestPostState = atom<IPostDto>({
  key: 'requestPostState',
  default: {
    category: EPost.QUESTION,
    introduction: '',
    thumbnail: '',
    title: '',
    contents: '',
    postTags: [],
  },
});