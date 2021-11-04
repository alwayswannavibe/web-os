// Libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Icon from '@Components/Icon/Icon';
import * as Window from '@Components/Window/Window';
import * as CalculatorInput from '@Calculator/components/CalculatorInput/CalculatorInput';
import * as CalculatorButtons from '@Calculator/components/CalculatorButtons/CalculatorButtons';
import * as CalculatorLastOperationsList from '@Calculator/components/CalculatorLastOperationsList/CalculatorLastOperationsList';
import { Calculator } from './Calculator';

describe('calculator component', () => {
  beforeEach(() => {
    jest.spyOn(CalculatorButtons, 'CalculatorButtons').mockReturnValue(<div data-testid="CalculatorButtons" />);
    jest.spyOn(CalculatorInput, 'CalculatorInput').mockReturnValue(<div data-testid="CalculatorInput" />);
    jest.spyOn(CalculatorLastOperationsList, 'CalculatorLastOperationsList')
      .mockReturnValue(<div data-testid="CalculatorLastOperationsList" />);
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
    expect(screen.queryByTestId('CalculatorLastOperationsList')).toBeInTheDocument();
    expect(screen.queryByTestId('Window')).toBeInTheDocument();
  });
});
