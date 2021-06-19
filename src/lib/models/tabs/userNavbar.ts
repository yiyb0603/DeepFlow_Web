export interface IUserNavbar {
  idx: number;
  name: string;
  pathName: string;
}

export const userNavbar: IUserNavbar[] = [
  {
    idx: 0,
    name: '프로필',
    pathName: 'user',
  },

  {
    idx: 1,
    name: '추천 목록',
    pathName: 'user-recommand',
  },
];