import customAxios from 'lib/customAxios';
import { IResponse } from 'types/Response';
import { IUserRecommandResponse } from 'types/userRecommand.types';
import { IRecommandDto } from './userRecommand.dto';

export const getRecommandsByUserIdx = async (userIdx: number): Promise<IUserRecommandResponse> => {
  const url: string = `/recommand/${userIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createRecommand = async (recommandDto: IRecommandDto): Promise<IResponse> => {
  const url: string = `/recommand`;
  const { data } = await customAxios.post(url, recommandDto);
  return data;
}

export const deleteRecommand = async (recommandIdx: number): Promise<IResponse> => {
  const url: string = `/recommand/${recommandIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}