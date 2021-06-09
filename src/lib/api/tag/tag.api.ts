import customAxios from 'lib/customAxios';
import { ETagSort } from 'lib/enum/tag';
import { ITagListResponse, ITagResponse } from 'types/tag.types';

export const getTagList = async (sort: ETagSort): Promise<ITagListResponse> => {
  const url: string = `/tag?sort=${sort}`;
  const { data } = await customAxios.get(url);
  return data;
}

export const getTagByTagName = async (tagName: string): Promise<ITagResponse> => {
  const url: string = `/tag/${tagName}`;
  const { data } = await customAxios.get(url);
  return data;
}