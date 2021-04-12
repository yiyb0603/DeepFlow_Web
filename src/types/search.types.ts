import { EPost } from 'lib/enum/post';

export interface ISearchKeyword {
  idx: number;
  category: EPost;
  keyword: string;
}