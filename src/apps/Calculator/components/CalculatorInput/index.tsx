// React, Redux
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { getCalculatorResult, setCalculatorInput } from 'src/redux/slices/appsSlicesBus/calculatorSlice';

// Styles
import styles from 'src/apps/Calculator/components/CalculatorInput/calculatorInput.module.css';

type PropsType = {
  children?: never;
};

const CalculatorInput: FC<PropsType> = () => {
  const inputValue = useSelector((state: RootState) => state.calculator.inputValue);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[\d+\-*^/.]*$/);
    const regExp2 = new RegExp(/^\S*$/);
    if (regExp.test(event.target.value) && regExp2.test(event.target.value)) {
      dispatch(setCalculatorInput(event.target.value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(getCalculatorResult());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="text" className={styles.input} value={inputValue} onChange={handleChange} />
    </form>
  );
};

export { CalculatorInput };
