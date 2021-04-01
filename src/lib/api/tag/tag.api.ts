import { customAxios } from 'lib/CustomAxios';
import { ETagSort } from 'lib/enum/tag';
import { ITagListResponse } from 'types/tag.types';

export const getTagList = async (sort: ETagSort): Promise<ITagListResponse> => {
  const url: string = `/tag?sort=${sort}`;
  const { data } = await customAxios.get(url);
  return data;
}