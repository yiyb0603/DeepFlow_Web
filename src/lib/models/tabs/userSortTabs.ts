import { ISortTab } from './sortTabs';

export const userSortTabs: ISortTab[] = [
  {
    idx: 0,
    name: '정렬순',
    route: '?sort=generation',
  },

  {
    idx: 1,
    name: '인기순',
    route: '?sort=popular'
  },
];