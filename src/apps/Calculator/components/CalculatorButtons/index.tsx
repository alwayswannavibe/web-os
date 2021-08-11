// Libraries
import React, { FC } from 'react';

// Components
import { CalculatorNumberButtons } from '../CalculatorNumberButtons';
import { CalculatorOperationButtons } from '../CalculatorOperationButtons';

// Styles
import styles from './calculatorButtons.module.css';

interface Props {
  children?: never;
}

const CalculatorButtons: FC<Props> = () => (
  <div className={styles.wrapper}>
    <div className={styles.buttons}>
      <CalculatorNumberButtons />
      <CalculatorOperationButtons />
    </div>
  </div>
);

export { CalculatorButtons };
