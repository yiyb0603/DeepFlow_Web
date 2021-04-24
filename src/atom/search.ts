import { getStorage } from 'lib/Storage';
import { atom } from 'recoil';
import { ISearchKeyword } from 'types/search.types';

const query: URLSearchParams = new URLSearchParams(window.location.search);
export const showSearchHistoryState = atom<boolean>({
  key: 'showSearchHistoryState',
  default: false,
});

export const searchKeywordState = atom<string>({
  key: 'searchKeywordState',
  default: query.get('keyword') || '',
});

export const searchKeywordListState = atom<ISearchKeyword[]>({
  key: 'searchKeywordListState',
  default: JSON.parse(getStorage('keywords')) || [],
});