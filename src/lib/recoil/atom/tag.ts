import { atom } from 'recoil';
import { ITag } from 'types/tag.types';

export const tagLoadingState = atom<boolean>({
  key: 'tagLoadingState',
  default: true,
});

export const tagMountedState = atom<boolean>({
  key: 'tagMountedState',
  default: false,
});

export const tagListState = atom<ITag[]>({
  key: 'tagListState',
  default: [] as ITag[],
});