const generatePattern = (max: number): number[] => {
  const randomList: number[] = [];
  for (let i = 0; i < 3; ++i) {
    randomList.push(Math.round(-0.5 + Math.random() * max));
  }
  return randomList;
};

const updatePattern = (pattern: number[], max: number): number[] => {
  const random = Math.round(-0.5 + Math.random() * max);
  const newPattern = [...pattern, random];
  return newPattern;
};

export { generatePattern, updatePattern };
