import customAxios from 'lib/customAxios';
import { EQuestionSort, EUserQuestion } from 'lib/enum/question';
import {
  IPopularQuestionListResponse,
  IQuestionListResponse,
  IQuestionResponse,
  IQuestionSaveResponse,
  IRecentPostListResponse
} from 'types/question.types';
import { IResponse } from 'types/Response';
import { IQuestionDto } from './question.dto';

export const getPostsBySort = async (sort: EQuestionSort, page: number): Promise<IQuestionListResponse> => {
  const url: string = `/posts?page=${page}&sort=${sort}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPostByIdx = async (postIdx: number): Promise<IQuestionResponse> => {
  const url: string = `/posts/${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createPost = async (postDto: IQuestionDto, isTemp: boolean): Promise<IQuestionSaveResponse> => {
  const url: string = '/posts';
  const { data } = await customAxios.post(url, {
    ...postDto,
    isTemp,
  });
  return data;
}

export const modifyPost = async (postIdx: number, postDto: IQuestionDto, isTemp: boolean): Promise<IResponse> => {
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

export const getUserPosts = async (userIdx: number, type: EUserQuestion): Promise<IQuestionListResponse> => {
  const url: string = `/posts/user/${userIdx}?type=${type}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPostsBySearch = async (keyword: string): Promise<IQuestionListResponse> => {
  const url: string = `/posts/search?keyword=${keyword}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getRecentPosts = async (count: number): Promise<IRecentPostListResponse> => {
  const url: string = `/posts/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPopularPosts = async (count: number): Promise<IPopularQuestionListResponse> => {
  const url: string = `/posts/popular?count=${count}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getTempPosts = async (): Promise<IQuestionListResponse> => {
  const url: string = `/posts/temp`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getPostsByTag = async (tagName: string): Promise<IQuestionListResponse> => {
  const url: string = `/posts/tag?tagName=${tagName}`;
  const { data } = await customAxios.get(url);
  return data;
}