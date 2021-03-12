import { selectorFamily } from "recoil";
import { recentPostState } from "atom/post";
import { getRecentPosts } from "lib/api/post/post.api";
import { IPost, IPostListResponse } from "types/post.types";

export const getRecentPostsState = selectorFamily<IPost[], number>({
  key: 'recentPostState',
  get: (count: number) => async ({ get }) => {
    get(recentPostState);
    const response: IPostListResponse = await getRecentPosts(count);
    const { recentPosts } = response.data;

    return recentPosts;
  },
});