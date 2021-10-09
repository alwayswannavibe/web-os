// Libraries
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import * as SelectionCategory from '@Chat/components/ChatSelection/components/SelectionCategory/SelectionCategory';
import { ChatSelection } from './ChatSelection';

describe('ChatSelection', () => {
  beforeEach(() => {
    jest.spyOn(SelectionCategory, 'SelectionCategory').mockReturnValue(<div
      className="SelectionCategory"
    />);
  });

  it('should render correctly', () => {
    render(
      <ChatSelection />,
    );

    const chatSelectionElement = document.getElementsByClassName('SelectionCategory');
    const btn = document.querySelector('.toggleVisibilityBtn');

    expect(chatSelectionElement).toHaveLength(2);
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });

  it('should close on toggle visibility button click', () => {
    render(
      <ChatSelection />,
    );

    const btn = document.querySelector('.toggleVisibilityBtn');

    userEvent.click(btn!);

    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('→');
  });

  it('should open on toggle visibility button click twice', () => {
    render(
      <ChatSelection />,
    );

    const btn = document.querySelector('.toggleVisibilityBtn');

    userEvent.click(btn!);
    userEvent.click(btn!);

    const chatSelectionElement = document.getElementsByClassName('ChatSelectionElement');

    expect(chatSelectionElement).toHaveLength(2);
    expect(btn).toBeInTheDocument();
    expect(btn!.textContent).toEqual('←');
  });
});
