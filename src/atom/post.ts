import { atom } from "recoil";
import { IPost } from "types/post.types";

export const recentPostState = atom<IPost[]>({
  key: 'recentPostState',
  default: [],
});

export const postPageState = atom<number>({
  key: 'postPage',
  default: 1,
});