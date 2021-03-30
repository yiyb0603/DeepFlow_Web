export interface IPostTab {
  name: string;
  route: string;
}

export const postTabs: IPostTab[] = [
  {
    name: '작성한 글',
    route: '?tab=0',
  },

  {
    name: '댓글을 작성한 글',
    route: '?tab=1',
  },
];