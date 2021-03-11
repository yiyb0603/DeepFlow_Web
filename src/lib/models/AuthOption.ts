export interface IAuthOption {
  value: number;
  text: string;
}

export const generations: IAuthOption[] = [
  {
    value: 1,
    text: '1기',
  },

  {
    value: 2,
    text: '2기',
  },

  {
    value: 3,
    text: '3기',
  },

  {
    value: 4,
    text: '4기',
  },

  {
    value: 5,
    text: '5기',
  },

  {
    value: 6,
    text: '6기',
  },
];

export const majors: IAuthOption[] = [
  {
    value: 0,
    text: '소프트웨어개발과',
  },

  {
    value: 1,
    text: '임베디드 소프트웨어과',
  },

  {
    value: 2,
    text: 'AI 인공지능 개발과',
  },
];