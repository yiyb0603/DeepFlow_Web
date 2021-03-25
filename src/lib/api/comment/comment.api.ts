import { customAxios } from 'lib/CustomAxios';
import { ICommentListResponse } from 'types/comment.types';

export const getCommentsByPostIdx = async (postIdx: number): Promise<ICommentListResponse> => {
  const url: string = `/comment?postIdx=${postIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}