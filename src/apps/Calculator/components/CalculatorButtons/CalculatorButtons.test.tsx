// React, redux
import { render } from '@testing-library/react';
import React from 'react';

// Components
import * as CalculatorButton from 'src/apps/Calculator/components/CalculatorButton';
import { CalculatorButtons } from '.';

// Styles
import styles from './calculatorButtons.module.css';

describe('calculator buttons component', () => {
  beforeEach(() => {
    jest.spyOn(CalculatorButton, 'CalculatorButton').mockReturnValue(<div data-testid="CalculatorButton" />);
    render(
      <CalculatorButtons />,
    );
  });

  describe('should render buttons', () => {
    it('should render number buttons', () => {
      const numberButtons = document.getElementsByClassName(styles.numberButton);
      expect(numberButtons).toHaveLength(9);
    });

    it('should render zero button', () => {
      const zeroButton = document.getElementsByClassName(styles.zeroButton);
      expect(zeroButton).toHaveLength(1);
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
});

export {};
