import { customAxios } from 'lib/CustomAxios';
import { IUserListResponse, IUserResponse } from 'types/user.types';

export const getUserInfo = async (userIdx: number): Promise<IUserResponse> => {
  const url: string = `/user/${userIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getUserList = async (): Promise<IUserListResponse> => {
  const url: string = '/user/list';
  const { data } = await customAxios.get(url);
  return data;
}