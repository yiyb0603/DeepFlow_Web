import { customAxios } from 'lib/CustomAxios';
import { ICommentListResponse } from 'types/comment.types';
import { IResponse } from 'types/Response';
import { ICommentDto } from './comment.dto';

export const getCommentsByPostIdx = async (postIdx: number): Promise<ICommentListResponse> => {
  const url: string = `/comment?postIdx=${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createComment = async (commentDto: ICommentDto): Promise<IResponse> => {
  const url: string = `/comment`;
  const { data } = await customAxios.post(url, commentDto);
  return data;
}

export const modifyComment = async (idx: number, commentDto: ICommentDto): Promise<IResponse> => {
  const url: string = `/comment/${idx}`;
  const { data } = await customAxios.put(url, commentDto);
  return data;
}

export const deleteComment = async (idx: number, postIdx: number): Promise<IResponse> => {
  const url: string = `/comment/${idx}?postIdx=${postIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}