export interface ITagTap {
  name: string;
  route: string;
}

export const tagTaps: ITagTap[] = [
  {
    name: '인기순',
    route: '?sort=popular',
  },

  {
    name: '이름순',
    route: '?sort=alphabetical',
  },
];