import { customAxios } from 'lib/CustomAxios';
import { INoticeListResponse, INoticeResponse } from 'types/notice.types';
import { IResponse } from 'types/Response';
import { INoticeDto } from './notice.dto';

export const getNoticeList = async (page: number): Promise<INoticeListResponse> => {
  const url: string = `/notice?page=${page}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getNoticeByIdx = async (noticeIdx: number): Promise<INoticeResponse> => {
  const url: string = `/notice/${noticeIdx}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const createNotice = async (noticeDto: INoticeDto): Promise<IResponse> => {
  const url: string = `/notice`;
  const { data } = await customAxios.post(url, noticeDto);
  return data;
}

export const modifyNotice = async (noticeIdx: number, noticeDto: INoticeDto): Promise<IResponse> => {
  const url: string = `/notice/${noticeIdx}`;
  const { data } = await customAxios.put(url, noticeDto);
  return data;
}

export const deleteNotice = async (noticeIdx: number): Promise<IResponse> => {
  const url: string = `/notice/${noticeIdx}`;
  const { data } = await customAxios.delete(url);
  return data;
}