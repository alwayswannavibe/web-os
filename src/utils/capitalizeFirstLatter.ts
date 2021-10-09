function capitalizeFirstLatter(input: string): string {
  if (!input) {
    return '';
  }

  const inputArr = input.split('');
  inputArr[0] = inputArr[0].toUpperCase();
  return inputArr.join('');
}

export { capitalizeFirstLatter };
