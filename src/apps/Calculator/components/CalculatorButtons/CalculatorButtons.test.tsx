// Libraries
import { render, screen } from '@testing-library/react';
import React from 'react';

// Components
import * as CalculatorNumberButtons from '../CalculatorNumberButtons';
import * as CalculatorOperationButtons from '../CalculatorOperationButtons';
import { CalculatorButtons } from '.';

describe('calculator buttons component', () => {
  beforeEach(() => {
    jest.spyOn(CalculatorNumberButtons, 'CalculatorNumberButtons')
      .mockReturnValue(<div data-testid="CalculatorNumberButtons" />);
    jest.spyOn(CalculatorOperationButtons, 'CalculatorOperationButtons')
      .mockReturnValue(<div data-testid="CalculatorOperationButtons" />);
    render(
      <CalculatorButtons />,
    );
  });

  describe('should render buttons', () => {
    it('should render number buttons', () => {
      const numberButtons = screen.queryByTestId('CalculatorNumberButtons');
      expect(numberButtons).toBeInTheDocument();
    });

    it('should render operation buttons', () => {
      const operationButtons = screen.queryByTestId('CalculatorOperationButtons');
      expect(operationButtons).toBeInTheDocument();
    });
  });
});

export {};
