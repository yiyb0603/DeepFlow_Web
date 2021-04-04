import { customAxios } from 'lib/CustomAxios';
import { EPost, EUserPost } from 'lib/enum/post';
import {
  IPopularPostListResponse,
  IPostListResponse,
  IPostResponse,
  IPostSaveResponse,
  IRecentPostListResponse
} from 'types/post.types';
import { IResponse } from 'types/Response';
import { IPostDto } from './post.dto';

export const getPostsByCategory = async (category: EPost, page: number): Promise<IPostListResponse> => {
  const url: string = `/posts?category=${category}&page=${page}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPostByIdx = async (postIdx: number): Promise<IPostResponse> => {
  const url: string = `/posts/${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createPost = async (postDto: IPostDto, isTemp: boolean): Promise<IPostSaveResponse> => {
  const url: string = '/posts';
  const { data } = await customAxios.post(url, {
    ...postDto,
    isTemp,
  });
  return data;
}

export const modifyPost = async (postIdx: number, postDto: IPostDto, isTemp: boolean): Promise<IResponse> => {
  const url: string = `/posts/${postIdx}`;
  const { data } = await customAxios.put(url, {
    ...postDto,
    isTemp,
  });
  return data;
}

export const deletePost = async (postIdx: number): Promise<IResponse> => {
  const url: string = `/posts/${postIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}

export const getUserPosts = async (userIdx: number, type: EUserPost): Promise<IPostListResponse> => {
  const url: string = `/posts/user/${userIdx}?type=${type}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getRecentPosts = async (count: number): Promise<IRecentPostListResponse> => {
  const url: string = `/posts/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPopularPosts = async (count: number): Promise<IPopularPostListResponse> => {
  const url: string = `/posts/popular?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getTempPosts = async (): Promise<IPostListResponse> => {
  const url: string = `/posts/temp`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPostsByTag = async (tagName: string, category: EPost): Promise<IPostListResponse> => {
  const url: string = `/posts/tag?category=${category}&tagName=${tagName}`;
  const { data } = await customAxios.get(url);
  return data;
}