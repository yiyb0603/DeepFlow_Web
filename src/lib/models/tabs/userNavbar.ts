export interface IUserNavbar {
  name: string;
  pathName: string;
}

export const userNavbar: IUserNavbar[] = [
  {
    name: '프로필',
    pathName: 'user',
  },

  {
    name: '추천 목록',
    pathName: 'user-recommand',
  },
];