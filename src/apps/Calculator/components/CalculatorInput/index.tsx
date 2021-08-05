// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { getCalculatorResult, setCalculatorInput } from 'src/redux/slices/appsSlicesBus/calculatorSlice';
import { RootState } from 'src/redux/store';

// Styles
import styles from './calculatorInput.module.css';

interface Props {
  children?: never;
}

const CalculatorInput: FC<Props> = () => {
  const inputValue = useSelector((state: RootState) => state.calculator.inputValue);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numbersAndOperatorsRegExp = new RegExp(/^[\d+\-*^/.]*$/);
    const notSpaceRegExp = new RegExp(/^\S*$/);
    if (numbersAndOperatorsRegExp.test(event.target.value) && notSpaceRegExp.test(event.target.value)) {
      dispatch(setCalculatorInput(event.target.value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(getCalculatorResult());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        autoFocus
        type="text"
        className={styles.input}
        value={inputValue !== 'Error' && inputValue !== 'Infinity' ? inputValue : ''}
        placeholder={inputValue === 'Error' || inputValue === 'Infinity' ? inputValue : ''}
        onChange={handleChange}
      />
    </form>
  );
};

export { CalculatorInput };
