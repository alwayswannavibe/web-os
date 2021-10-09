// Lebraries
import { render } from '@testing-library/react';

// Components
import * as CalculatorButton from '@Calculator/components/CalculatorButton/CalculatorButton';
import { CalculatorNumberButtons } from './CalculatorNumberButtons';

// Styles
import styles from './calculatorNumberButtons.module.css';

describe('CalculatorNumberButtons', () => {
  beforeEach(() => {
    jest.spyOn(CalculatorButton, 'CalculatorButton')
      .mockReturnValue(<div data-testid="CalculatorButton" />);
    render(
      <CalculatorNumberButtons />,
    );
  });

  it('should render number buttons', () => {
    const numberButtons = document.getElementsByClassName(styles.numberButton);
    expect(numberButtons).toHaveLength(9);
  });

  it('should render zero button', () => {
    const zeroButton = document.getElementsByClassName(styles.zeroButton);
    expect(zeroButton).toHaveLength(1);
  });
});
