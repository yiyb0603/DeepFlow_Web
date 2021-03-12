import { customAxios } from "lib/CustomAxios";
import { IPostListResponse } from "types/post.types";

export const getRecentPosts = async (count: number): Promise<IPostListResponse> => {
  const url: string = `/post/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}