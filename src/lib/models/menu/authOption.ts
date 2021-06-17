import getMaxGeneration from 'util/getMaxGeneration';

export interface IAuthOption {
  value: number;
  text: string;
}

export const generations: unknown[] = Array.apply(null, new Array(getMaxGeneration()).map(() => 0));

export const majors: IAuthOption[] = [
  {
    value: 0,
    text: '소프트웨어개발과',
  },

  {
    value: 1,
    text: '임베디드 소프트웨어과',
  },
];