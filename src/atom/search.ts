import { getStorage } from 'lib/Storage';
import { atom } from 'recoil';
import { ISearchKeyword } from 'types/search.types';

export const showSearchHistoryState = atom<boolean>({
  key: 'showSearchHistoryState',
  default: false,
});

export const searchKeywordState = atom<ISearchKeyword[]>({
  key: 'searchKeywordState',
  default: JSON.parse(getStorage('keywords')) || [],
});