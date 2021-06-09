import customAxios from 'lib/customAxios';
import { ILikeResponse } from 'types/like.types';
import { ILikeDto } from './like.dto';

export const createLike = async (likeDto: ILikeDto): Promise<void> => {
  const url: string = `/like`;
  await customAxios.post(url, likeDto);
}

export const deleteLike = async (likeIdx: number, postIdx: number): Promise<void> => {
  const url: string = `/like/${likeIdx}?postIdx=${postIdx}`;
  await customAxios.delete(url);
}

export const getLikeList = async (postIdx: number): Promise<ILikeResponse> => {
  const url: string = `/like?postIdx=${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}