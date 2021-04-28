import { customAxios } from 'lib/CustomAxios';
import { EUserSort } from 'lib/enum/user';
import { IResponse } from 'types/Response';
import { IUserListResponse, IUserResponse } from 'types/user.types';
import { IUserModify, SetFCMDto } from './user.dto';

export const getUserInfo = async (userIdx: number): Promise<IUserResponse> => {
  const url: string = `/user/${userIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const modifyUserInfo = async (modifyInfo: IUserModify): Promise<IResponse> => {
  const url: string = `/user`;
  const { data } = await customAxios.put(url, modifyInfo);
  return data;
}

export const getUserList = async (sort: EUserSort): Promise<IUserListResponse> => {
  const url: string = `/user/list?sort=${sort}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const setFCMToken = async (setFCMDto: SetFCMDto): Promise<IResponse> => {
  const url: string = `/user/fcm`;
  const { data } = await customAxios.post(url, setFCMDto);
  return data;
}