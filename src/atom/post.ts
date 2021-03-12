import { atom } from "recoil";
import { IPost } from "types/post.types";

export const recentPostState = atom<IPost[]>({
  key: 'recentPostState',
  default: [],
});