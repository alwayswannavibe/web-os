function checkInputValueCorrect(inputValue: string): boolean {
  const operatorRegExp = new RegExp(/[+, *, /, ^, .]/);
  const operatorsInRowRegExp = new RegExp(/[+, *, /, ^, .]{2,}/);
  const minusesInRowRegExp = new RegExp(/[-]{3,}/);
  const onlyOperatorsAndNumbersRegExp = new RegExp(/^[\d+\-*^./\s]*$/g);

  return !(
    !onlyOperatorsAndNumbersRegExp.test(inputValue)
    || operatorRegExp.test(inputValue[0])
    || operatorsInRowRegExp.test(inputValue)
    || minusesInRowRegExp.test(inputValue)
  );
}

function compare(symbol1: string, symbol2: string, operators: string[]): number {
  if (
    (operators.indexOf(symbol1) < operators.indexOf(symbol2) && operators.indexOf(symbol1) !== -1) ||
    operators.indexOf(symbol2) === -1
  ) {
    return operators.indexOf(symbol1);
  }
  return operators.indexOf(symbol2);
}

function processPow(numbers: number[], operators: string[]): [number[], string[]] {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = operatorsCopy.lastIndexOf('^');

  while (index !== -1) {
    numbersCopy[index] **= numbersCopy[index + 1];
    numbersCopy.splice(index + 1, 1);
    operatorsCopy.splice(index, 1);
    index = operatorsCopy.lastIndexOf('^');
  }
  return [numbersCopy, operatorsCopy];
}

function processMultiplyAndDivision(numbers: number[], operators: string[]): [number[], string[]] {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = compare('*', '/', operators);

  let decimalLength = 0;
  while (index !== -1) {
    decimalLength = 0;
    if (numbersCopy[index] % 1 || numbersCopy[index + 1] % 1) {
      decimalLength = Math.max(
        numbersCopy[index].toString().split('.')[1]?.length || 0,
        numbersCopy[index + 1].toString().split('.')[1]?.length || 0,
      );
    }
    if (operatorsCopy.indexOf('*') === index) {
      if (decimalLength) {
        numbersCopy[index] =
          (
            Math.floor(numbersCopy[index] * 10 ** decimalLength)
            * Math.floor(numbersCopy[index + 1] * 10 ** decimalLength)
          ) / 100 ** decimalLength;
      } else {
        numbersCopy[index] *= numbersCopy[index + 1];
      }
    } else if (decimalLength) {
      numbersCopy[index] =
        (
          Math.floor(numbersCopy[index] * 10 ** decimalLength)
          / Math.floor(numbersCopy[index + 1] * 10 ** decimalLength)
        );
    } else {
      numbersCopy[index] /= numbersCopy[index + 1];
    }
    numbersCopy.splice(index + 1, 1);
    operatorsCopy.splice(index, 1);
    index = compare('*', '/', operatorsCopy);
  }

  return [numbersCopy, operatorsCopy];
}

function processAddAndSubtract(numbers: number[], operators: string[]): [number[], string[]] {
  const numbersCopy = [...numbers];
  const operatorsCopy = [...operators];

  let index = compare('+', '-', operators);

  let decimalLength = 0;
  while (index !== -1) {
    decimalLength = 0;
    if (numbersCopy[index] % 1 || numbersCopy[index + 1] % 1) {
      decimalLength = Math.max(
        numbersCopy[index].toString().split('.')[1]?.length || 0,
        numbersCopy[index + 1].toString().split('.')[1]?.length || 0,
      );
    }
    if (operatorsCopy.indexOf('+') === index) {
      if (decimalLength) {
        numbersCopy[index] =
          (
            Math.floor(numbersCopy[index] * 10 ** decimalLength)
            + Math.floor(numbersCopy[index + 1] * 10 ** decimalLength)
          ) / 10 ** decimalLength;
      } else {
        numbersCopy[index] += numbersCopy[index + 1];
      }
    } else if (decimalLength) {
      numbersCopy[index] =
        (
          Math.floor(numbersCopy[index] * 10 ** decimalLength)
          - Math.floor(numbersCopy[index + 1] * 10 ** decimalLength)
        ) / 10 ** decimalLength;
    } else {
      numbersCopy[index] -= numbersCopy[index + 1];
    }
    numbersCopy.splice(index + 1, 1);
    operatorsCopy.splice(index, 1);
    index = compare('+', '-', operatorsCopy);
  }
  return [numbersCopy, operatorsCopy];
}

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

function getCalcResult(inputValue: string): string {
  if (inputValue.replaceAll(' ', '').length < 1) {
    return '';
  }

  const inputValueWithoutSpaces = inputValue.replaceAll(' ', '');

  if (!checkInputValueCorrect(inputValueWithoutSpaces)) return 'Error';

  let numbers = getNumbersFromInput(inputValueWithoutSpaces);
  let input2 = '';
  if (inputValueWithoutSpaces[0] === '-') {
    input2 = inputValueWithoutSpaces.slice(1);
  } else {
    input2 = inputValueWithoutSpaces;
  }
  let operators = input2
    .replaceAll(/--/g, '-')
    .replaceAll(/\+-/g, '+')
    .replaceAll(/\*-/g, '*')
    .replaceAll(/\/-/g, '/')
    .replaceAll(/\^-/g, '^')
    .split(/[0-9,.]+/)
    .filter((el) => el.length);

  const [numbersAfterPowProcess, operatorsAfterPowProcess] = processPow(numbers, operators);
  numbers = [...numbersAfterPowProcess];
  operators = [...operatorsAfterPowProcess];

  const [numbersAfterMDProcess, operatorsAfterMDProcess] = processMultiplyAndDivision(numbers, operators);
  numbers = [...numbersAfterMDProcess];
  operators = [...operatorsAfterMDProcess];

  const [numbersAfterASProcess, operatorsAfterASProcess] = processAddAndSubtract(numbers, operators);
  numbers = [...numbersAfterASProcess];
  operators = [...operatorsAfterASProcess];

  return typeof numbers[0] === 'number' && !Number.isNaN(numbers[0]) ? numbers[0].toString() : 'Error';
}

export { getCalcResult };
