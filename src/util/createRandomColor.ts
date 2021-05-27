const createRandomColor = (): string => {
  return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
}

export default createRandomColor;