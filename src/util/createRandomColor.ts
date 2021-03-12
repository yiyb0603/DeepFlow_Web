const MAX_VALUE: number = 255;

export const createRandomColor = (): string => {
  const randomRed: number = Math.floor(Math.random() * MAX_VALUE);
  const randomGreen: number = Math.floor(Math.random() * MAX_VALUE);
  const randomBlue: number = Math.floor(Math.random() * MAX_VALUE);

  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}