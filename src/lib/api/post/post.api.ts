import { customAxios } from "lib/CustomAxios";
import { IPostListResponse, IPostResponse } from "types/post.types";
import { IResponse } from "types/Response";
import { IPostDto } from "./post.dto";

export const getPostByIdx = async (postIdx: number): Promise<IPostResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createPost = async (postDto: IPostDto): Promise<IResponse> => {
  const url: string = '/post';
  const { data } = await customAxios.post(url, postDto);
  return data;
}

export const modifyPost = async (postIdx: number, postDto: IPostDto): Promise<IResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.put(url, postDto);
  return data;
}

export const deletePost = async (postIdx: number): Promise<IResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}

export const getRecentPosts = async (count: number): Promise<IPostListResponse> => {
  const url: string = `/post/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}