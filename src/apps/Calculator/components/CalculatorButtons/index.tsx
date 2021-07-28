// Libraries
import React, { FC, ReactNode } from 'react';

// Components
import { CalculatorButton } from '../CalculatorButton';

// Styles
import styles from './calculatorButtons.module.css';

type PropsType = {
  children?: never;
};

const CalculatorButtons: FC<PropsType> = () => {
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operationButtons = ['+', '-', '*', '/', '^', '.', 'C'];

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div className={styles.numberButtons}>
          {numberButtons.map(
            (value): ReactNode => (
              <div className={styles.numberButton} key={value}>
                <CalculatorButton value={value} />
              </div>
            ),
          )}
          <div className={styles.zeroButton}>
            <CalculatorButton value="0" />
          </div>
        </div>
        <div className={styles.operationButtons}>
          {operationButtons.map(
            (value): ReactNode => (
              <div className={styles.operationButton} key={value}>
                <CalculatorButton value={value} />
              </div>
            ),
          )}
          <div className={styles.clearOneButton}>
            <CalculatorButton value="←" />
          </div>
          <div className={styles.enterButton}>
            <CalculatorButton value="Enter" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CalculatorButtons };
