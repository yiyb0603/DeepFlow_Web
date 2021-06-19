export interface ISortTab {
  idx: number;
  name: string;
  route: string;
}

export const sortTabs: ISortTab[] = [
  {
    idx: 0,
    name: '인기순',
    route: '?sort=popular',
  },

  {
    idx: 1,
    name: '이름순',
    route: '?sort=alphabetical',
  },
];