import customAxios from 'lib/customAxios';
import { IUploadResponse } from 'types/uploads.types';

export const uploadFiles = async (formData: FormData): Promise<IUploadResponse> => {
  const url: string = '/uploads';
  const { data } = await customAxios.post(url, formData);
  return data;
}