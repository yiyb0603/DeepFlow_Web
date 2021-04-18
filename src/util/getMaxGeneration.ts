export const getMaxGeneration = (): number => {
  const nowDate: Date = new Date();
  const establishedAt: Date = new Date('2016-03-02');

  return (nowDate.getFullYear() - establishedAt.getFullYear()) + 1;
};