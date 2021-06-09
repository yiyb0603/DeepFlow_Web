import customAxios from 'lib/customAxios';
import { IResponse } from 'types/Response';
import { IReplyDto } from './reply.dto';

export const createReply = async (replyDto: IReplyDto): Promise<IResponse> => {
  const url: string = `/reply`;
  const { data } = await customAxios.post(url, replyDto);
  return data;
}

export const modifyReply = async (replyIdx: number, replyDto: IReplyDto): Promise<IResponse> => {
  const url: string = `/reply/${replyIdx}`;
  const { data } = await customAxios.put(url, replyDto);
  return data;
}

export const deleteReply = async (replyIdx: number): Promise<IResponse> => {
  const url: string = `/reply/${replyIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}