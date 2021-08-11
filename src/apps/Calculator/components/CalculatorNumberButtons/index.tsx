// Libraries
import React, { FC, ReactNode } from 'react';

// Components
import { CalculatorButton } from '../CalculatorButton';

// Styles
import styles from '../CalculatorButtons/calculatorButtons.module.css';

interface Props {
  children?: never;
}

const CalculatorNumberButtons: FC<Props> = () => {
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
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
  );
};

export { CalculatorNumberButtons };
