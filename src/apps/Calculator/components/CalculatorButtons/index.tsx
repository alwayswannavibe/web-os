// React, Redux
import React, { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
} from 'redux/slices/calculatorSlice';

// Components
import { CalculatorButton } from 'apps/Calculator/components/CalculatorButton';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

const CalculatorButtons: FC<PropsType> = () => {
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operationButtons = ['+', '-', '*', '/', '^', '.', 'C'];

  const dispatch = useDispatch();

  const handleClick = (value: string) => {
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
    <div className={styles.buttons}>
      <div className={styles.numberButtons}>
        {numberButtons.map(
          (value): ReactNode => (
            <div className={styles.numberButton} key={value}>
              <CalculatorButton value={value} handleClick={handleClick} />
            </div>
          ),
        )}
        <div className={styles.zeroButton}>
          <CalculatorButton value="0" handleClick={handleClick} />
        </div>
      </div>
      <div className={styles.operationButtons}>
        {operationButtons.map(
          (value): ReactNode => (
            <div className={styles.operationButton} key={value}>
              <CalculatorButton value={value} handleClick={handleClick} />
            </div>
          ),
        )}
        <div className={styles.clearOneButton}>
          <CalculatorButton value="←" handleClick={handleClick} />
        </div>
        <div className={styles.enterButton}>
          <CalculatorButton value="Enter" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export { CalculatorButtons };
