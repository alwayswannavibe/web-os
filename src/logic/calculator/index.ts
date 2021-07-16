const checkInputValueCorrect = (inputValue: string): boolean => {
  const operatorRegExp = new RegExp(/[+, \-, *, /, ^, .]/);
  const operatorsInRowRegExp = new RegExp(/[+, \-, *, /, ^, .]{2,}/);

  return !(operatorRegExp.test(inputValue[0]) || operatorsInRowRegExp.test(inputValue));
};

const compare = (symbol1: string, symbol2: string, operators: string[]) => {
  if (
    (operators.indexOf(symbol1) < operators.indexOf(symbol2) && operators.indexOf(symbol1) !== -1) ||
    operators.indexOf(symbol2) === -1
  ) {
    return operators.indexOf(symbol1);
  }
  return operators.indexOf(symbol2);
};

const processPow = (numbers: number[], operators: string[]): [number[], string[]] => {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = operatorsCopy.lastIndexOf('^');

  while (index !== -1) {
    numbersCopy[index - 1] = numbersCopy[index - 1] ** numbersCopy[index];
    numbersCopy.splice(index, 1);
    operatorsCopy.splice(index, 1);
    index = operatorsCopy.lastIndexOf('^');
  }
  return [numbersCopy, operatorsCopy];
};

const processMultiplyAndDivision = (numbers: number[], operators: string[]): [number[], string[]] => {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = compare('*', '/', operators);

  while (index !== -1) {
    if (operatorsCopy.indexOf('*') === index) {
      numbersCopy[index - 1] = numbersCopy[index - 1] * numbersCopy[index];
    } else {
      numbersCopy[index - 1] = numbersCopy[index - 1] / numbersCopy[index];
    }
    numbersCopy.splice(index, 1);
    operatorsCopy.splice(index, 1);
    index = compare('*', '/', operatorsCopy);
  }

  return [numbersCopy, operatorsCopy];
};

const processAddAndSubtract = (numbers: number[], operators: string[]): [number[], string[]] => {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = compare('+', '-', operators);

  let decimalLength = 0;
  while (index !== -1) {
    decimalLength = 0;
    if (numbersCopy[index - 1] % 1 || numbersCopy[index] % 1) {
      decimalLength = Math.max(
        numbersCopy[index - 1].toString().split('.')[1].length,
        numbersCopy[index].toString().split('.')[1].length,
      );
    }
    if (operatorsCopy.indexOf('+') === index) {
      if (decimalLength) {
        numbersCopy[index - 1] =
          (numbersCopy[index - 1] * 10 ** decimalLength + numbersCopy[index] * 10 ** decimalLength) /
          10 ** decimalLength;
      } else {
        numbersCopy[index - 1] = numbersCopy[index - 1] + numbersCopy[index];
      }
    } else if (decimalLength) {
      numbersCopy[index - 1] =
        (numbersCopy[index - 1] * 10 ** decimalLength - numbersCopy[index] * 10 ** decimalLength) / 10 ** decimalLength;
    } else {
      numbersCopy[index - 1] = numbersCopy[index - 1] - numbersCopy[index];
    }
    numbersCopy.splice(index, 1);
    operatorsCopy.splice(index, 1);
    index = compare('+', '-', operatorsCopy);
  }
  return [numbersCopy, operatorsCopy];
};

const getCalcResult = (inputValue: string): string => {
  if (!checkInputValueCorrect(inputValue)) return '';

  let numbers = inputValue.split(/[*+\-/^]/).map(Number);
  let operators = inputValue.split(/[0-9, .]+/);

  const [numbersAfterPowProcess, operatorsAfterPowProcess] = processPow(numbers, operators);
  numbers = [...numbersAfterPowProcess];
  operators = [...operatorsAfterPowProcess];

  const [numbersAfterMDProcess, operatorsAfterMDProcess] = processMultiplyAndDivision(numbers, operators);
  numbers = [...numbersAfterMDProcess];
  operators = [...operatorsAfterMDProcess];

  const [numbersAfterASProcess, operatorsAfterASProcess] = processAddAndSubtract(numbers, operators);
  numbers = [...numbersAfterASProcess];
  operators = [...operatorsAfterASProcess];

  return numbers[0].toString();
};

export { getCalcResult };
