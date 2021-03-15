import { customAxios } from "lib/CustomAxios";
import { IPostListResponse, IPostResponse } from "types/post.types";

export const getPostByIdx = async (postIdx: number): Promise<IPostResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getRecentPosts = async (count: number): Promise<IPostListResponse> => {
  const url: string = `/post/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}