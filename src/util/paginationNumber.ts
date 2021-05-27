import { CHUNK_PAGE_COUNT } from 'constants/util';

const paginationNumber = (maxPage: number): number[][] => {
  const numbers: number[][] = [];

  let temp: number[] = [];
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

export default paginationNumber;