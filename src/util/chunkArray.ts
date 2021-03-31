export const chunkArray = (array: any[], size: number): any[][] => {
  const chunked = [];
  let index: number = 0;

  if (Array.isArray(array)) {
    while (index < array.length) {
      chunked.push(array.slice(index, index + size));
      index += size;
    }
  }

  return chunked;
}