import { IResponse } from './Response';

export interface ITagListResponse extends IResponse {
  data: {
    tags: ITag[];
  },
}

export interface ITag {
  name: string;
  description: string;
  count: number;
}