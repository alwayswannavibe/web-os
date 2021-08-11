// Libraries
import React, { FC, ReactNode } from 'react';

// Components
import { CalculatorButton } from '../CalculatorButton';

// Styles
import styles from '../CalculatorButtons/calculatorButtons.module.css';

interface Props {
  children?: never;
}

const CalculatorOperationButtons: FC<Props> = () => {
  const operationButtons = ['+', '-', '*', '/', '^', '.', 'C'];

  return (
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
  );
};

export { CalculatorOperationButtons };
