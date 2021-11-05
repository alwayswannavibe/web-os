function getNumbersFromInput(value: string): number[] {
  const numbers: number[] = [];
  const splitedValue = value.split('');
  let currentNumber = '';
  for (let i = 0; i < splitedValue.length; i++) {
    if (!/[\d.]/.test(splitedValue[i])) {
      if (splitedValue[i] === '-' && (i === 0 || !/[\d.]/.test(splitedValue[i - 1]))) {
        currentNumber += '-';
        continue;
      }
      numbers.push(+currentNumber);
      currentNumber = '';
      continue;
    }
    currentNumber += splitedValue[i];
    if (i === splitedValue.length - 1) {
      numbers.push(+currentNumber);
      currentNumber = '';
      continue;
    }
  }
  return numbers;
}

export { getNumbersFromInput };
