// React, Redux
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
} from 'src/redux/slices/appsSlicesBus/calculatorSlice';

// Styles
import styles from './calculatorButton.module.css';

type PropsType = {
  children?: never;
  value: string;
};

const CalculatorButton: FC<PropsType> = ({ value }: PropsType) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (value === 'Enter') {
      dispatch(getCalculatorResult());
    } else if (value === '←') {
      dispatch(deleteLastCalculatorInput());
    } else if (value === 'C') {
      dispatch(clearCalculatorInput());
    } else {
      dispatch(addToCalculatorInput(value));
    }
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      {value}
    </button>
  );
};

export { CalculatorButton };
