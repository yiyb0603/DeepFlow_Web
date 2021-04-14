export interface ITagTap {
  name: string;
  route: string;
}

export const tagTaps: ITagTap[] = [
  {
    name: '인기순',
    route: '?sort=0',
  },

  {
    name: '이름순',
    route: '?sort=1',
  },
];