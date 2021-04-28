export interface ISortTab {
  name: string;
  route: string;
}

export const sortTabs: ISortTab[] = [
  {
    name: '인기순',
    route: '?sort=popular',
  },

  {
    name: '이름순',
    route: '?sort=alphabetical',
  },
];