const createRandomNumber = (): number => {
  return Math.floor(Math.random() * 99999999999) + 10000;
}

export default createRandomNumber;