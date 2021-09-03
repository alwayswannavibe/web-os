import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatSelection } from '.';
import * as ChatSelectionElement from '../ChatSelectionElement';

describe('ChatSelection', () => {
  beforeEach(() => {
    jest.spyOn(ChatSelectionElement, 'ChatSelectionElement').mockReturnValue(<div
      data-testid="ChatSelectionElement"
    />);
  });

  it('should render correctly', () => {
    render(
      <ChatSelection />,
    );

    const chatSelectionElement = screen.queryByTestId('ChatSelectionElement');
    const btn = document.querySelector('.togglevisiblityBtn');

    expect(chatSelectionElement).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });

  it('should close on toggle visibility button click', () => {
    render(
      <ChatSelection />,
    );

    const btn = document.querySelector('.togglevisiblityBtn');

    userEvent.click(btn!);

    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('→');
  });

  it('should open on toggle visibility button click twice', () => {
    render(
      <ChatSelection />,
    );

    const btn = document.querySelector('.togglevisiblityBtn');

    userEvent.click(btn!);
    userEvent.click(btn!);

    const chatSelectionElement = screen.queryByTestId('ChatSelectionElement');

    expect(chatSelectionElement).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });
});
