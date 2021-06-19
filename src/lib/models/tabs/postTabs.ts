export interface IQuestionTab {
  idx: number;
  name: string;
  route: string;
}

export const userPostTabs: IQuestionTab[] = [
  {
    idx: 0,
    name: '작성한 글',
    route: '?tab=writed',
  },

  {
    idx: 1,
    name: '댓글을 작성한 글',
    route: '?tab=commented',
  },
];

export const sortPostTabs: IQuestionTab[] = [
  {
    idx: 0,
    name: '최신순',
    route: '?sort=recent',
  },

  {
    idx: 1,
    name: '인기순',
    route: '?sort=popular',
  },
];