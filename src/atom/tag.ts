import { ETagSort } from 'lib/enum/tag';
import { atom } from 'recoil';
import { ITag } from 'types/tag.types';

export const tagLoadingState = atom<boolean>({
  key: 'tagLoadingState',
  default: true,
});

export const tagListState = atom<ITag[]>({
  key: 'tagListState',
  default: [] as ITag[],
});

export const tagSortState = atom<ETagSort>({
  key: 'tagSortState',
  default: ETagSort.POPULAR,
});