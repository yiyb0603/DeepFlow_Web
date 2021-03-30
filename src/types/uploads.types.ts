import { IResponse } from './Response';

export interface IUploadResponse extends IResponse {
  data: {
    files: string[];
  },
}