// Libraries
import { render } from '@testing-library/react';

// Components
import * as CalculatorButton from '@Calculator/components/CalculatorButton/CalculatorButton';
import { CalculatorOperationButtons } from './CalculatorOperationButtons';

// Styles
import styles from './calculatorOperationButtons.module.css';

describe('CalculatorOperationButtons', () => {
  beforeEach(() => {
    jest.spyOn(CalculatorButton, 'CalculatorButton')
      .mockReturnValue(<div data-testid="CalculatorButton" />);
    render(
      <CalculatorOperationButtons />,
    );
  });

  it('should render operation buttons', () => {
    const operationButtons = document.getElementsByClassName(styles.operationButton);
    expect(operationButtons).toHaveLength(7);
  });

  it('should render clear one button', () => {
    const clearOneButton = document.getElementsByClassName(styles.clearOneButton);
    expect(clearOneButton).toHaveLength(1);
  });

  it('should render enter button', () => {
    const enterButton = document.getElementsByClassName(styles.enterButton);
    expect(enterButton).toHaveLength(1);
  });
});
