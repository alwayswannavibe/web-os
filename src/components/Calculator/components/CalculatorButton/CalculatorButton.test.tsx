import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CalculatorButton } from './index';
import styles from './style.module.css';

describe('calculator  components', () => {
  const mockHandleClick = jest.fn();

  render(<CalculatorButton value="1" handleClick={mockHandleClick} />);

  it('calls handleClick on click', () => {
    const button = document.getElementsByClassName(styles.button)[0];
    userEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it('have correct value', () => {
    const button = document.getElementsByClassName(styles.button)[0];
    expect(button.textContent).toBe('1');
  });
});

export {};
