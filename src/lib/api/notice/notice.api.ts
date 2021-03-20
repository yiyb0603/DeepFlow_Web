import { customAxios } from 'lib/CustomAxios';
import { INoticeResponse } from 'types/notice.types';

export const getNoticeList = async (page: number): Promise<INoticeResponse> => {
  const url: string = `/notice?page=${page}`;
  const { data } = await customAxios.get(url);
  return data;
}