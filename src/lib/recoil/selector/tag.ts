import { selectorFamily } from 'recoil';
import { getTagByTagName, getTagList } from 'lib/api/tag/tag.api';
import { ETagSort } from 'lib/enum/tag';
import { ITag } from 'types/tag.types';

export const tagListSelector = selectorFamily<ITag[], ETagSort>({
  key: 'tagListSelector',
  get: (sortRule: ETagSort) => async () => {
    const { data: { tags } } = await getTagList(sortRule);
    return tags;
  },
});

export const tagSelector = selectorFamily<ITag, string>({
  key: 'tagSelector',
  get: (tagName: string) => async () => {
    const { data: { tag } } = await getTagByTagName(tagName);
    return tag;
  },
});