export interface IPostTab {
  name: string;
  route: string;
}

export const userPostTabs: IPostTab[] = [
  {
    name: '작성한 글',
    route: '?tab=writed',
  },

  {
    name: '댓글을 작성한 글',
    route: '?tab=commented',
  },
];

export const sortPostTabs: IPostTab[] = [
  {
    name: '최신순',
    route: '?sort=recent',
  },

  {
    name: '인기순',
    route: '?sort=popular',
  },
];