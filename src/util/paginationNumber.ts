import { CHUNK_PAGE_COUNT } from 'constants/util';

export const paginationNumber = (maxPage: number): number[][] => {
  const numbers: number[][] = [];

  let temp = [];
  for (let i = 1; i <= maxPage; i++) {
    temp.push(i);

    if (i % CHUNK_PAGE_COUNT === 0) {
      numbers.push(temp);
      temp = [];
    }
  }

  numbers.push(temp);
  return numbers;
}