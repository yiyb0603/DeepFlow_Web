import { customAxios } from 'lib/CustomAxios';
import { IUserResponse } from 'types/user.types';

export const getUserInfo = async (userIdx: number): Promise<IUserResponse> => {
  const url: string = `/user/${userIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}