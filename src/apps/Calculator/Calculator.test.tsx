// Libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Icon from 'src/components/Icon';
import * as Window from 'src/components/Window';
import * as CalculatorInput from './components/CalculatorInput';
import * as CalculatorButtons from './components/CalculatorButtons';
import { Calculator } from '.';

describe('calculator component', () => {
  beforeAll(() => {
    jest.spyOn(CalculatorButtons, 'CalculatorButtons').mockReturnValue(<div data-testid="CalculatorButtons" />);
    jest.spyOn(CalculatorInput, 'CalculatorInput').mockReturnValue(<div data-testid="CalculatorInput" />);
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => (
      <div data-testid="Window">{children}</div>
    ));
    render(
      <Calculator />,
    );
  });

  it('should render all components', () => {
    expect(screen.queryByTestId('Icon')).toBeInTheDocument();
    expect(screen.queryByTestId('CalculatorInput')).toBeInTheDocument();
    expect(screen.queryByTestId('CalculatorButtons')).toBeInTheDocument();
    expect(screen.queryByTestId('Window')).toBeInTheDocument();
  });
});
