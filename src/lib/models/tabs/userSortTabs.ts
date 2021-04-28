import { ISortTab } from './sortTabs';

export const userSortTabs: ISortTab[] = [
  {
    name: '정렬순',
    route: '?sort=generation',
  },

  {
    name: '인기순',
    route: '?sort=popular'
  },
];