import { customAxios } from 'lib/CustomAxios';
import { IPostResponse, IPostSaveResponse } from 'types/post.types';
import { ICustomResponse, IResponse } from 'types/Response';
import { IPostDto } from './post.dto';

export const getPostByIdx = async (postIdx: number): Promise<IPostResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createPost = async (postDto: IPostDto, isTemp: boolean): Promise<IPostSaveResponse> => {
  const url: string = '/post';
  const { data } = await customAxios.post(url, {
    ...postDto,
    isTemp,
  });
  return data;
}

export const modifyPost = async (postIdx: number, postDto: IPostDto, isTemp: boolean): Promise<IResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.put(url, {
    ...postDto,
    isTemp,
  });
  return data;
}

export const deletePost = async (postIdx: number): Promise<IResponse> => {
  const url: string = `/post/${postIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}

export const getRecentPosts = async (count: number): Promise<ICustomResponse> => {
  const url: string = `/post/recent?count=${count}`;
  const { data } = await customAxios.get(url);
  return {
    data: data.data.recentPosts,
  };
}