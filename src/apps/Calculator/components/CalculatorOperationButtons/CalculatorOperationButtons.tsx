// Libraries
import React, { FC, ReactNode } from 'react';

// Components
import { CalculatorButton } from '@Calculator/components/CalculatorButton/CalculatorButton';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './calculatorOperationButtons.module.css';

const CalculatorOperationButtons: FC<ChildrenNever> = React.memo(() => {
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
});

export { CalculatorOperationButtons };
