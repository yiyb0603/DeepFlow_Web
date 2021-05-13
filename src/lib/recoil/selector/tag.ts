import { getTagByTagName, getTagList } from 'lib/api/tag/tag.api';
import { ETagSort } from 'lib/enum/tag';
import { selectorFamily } from 'recoil';
import { ITagListResponse, ITagResponse } from 'types/tag.types';

export const tagListSelector = selectorFamily<ITagListResponse, ETagSort>({
  key: 'tagListSelector',
  get: (sortRule: ETagSort) => async () => {
    const data = await getTagList(sortRule);
    return data;
  },
});

export const tagSelector = selectorFamily<ITagResponse, string>({
  key: 'tagSelector',
  get: (tagName: string) => async () => {
    const data = await getTagByTagName(tagName);
    return data;
  },
});