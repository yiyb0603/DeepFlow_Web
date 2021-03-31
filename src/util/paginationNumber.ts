export const paginationNumber = (maxPage: number): number[][] => {
  const numbers: number[][] = [];

  let temp = [];
  for (let i = 1; i <= maxPage; i++) {
    temp.push(i);
    if (i % 5 === 0) {
      numbers.push(temp);
      temp = [];
    }
  }

  numbers.push(temp);
  return numbers;
}