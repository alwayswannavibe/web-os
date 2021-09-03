// libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Window from 'src/components/Window';
import * as Icon from 'src/components/Icon';
import * as ChatSelection from './components/ChatSelection';
import * as MessagesList from './components/MessagesList';
import * as ChatInput from './components/ChatInput';
import { Chat } from '.';

describe('Chat', () => {
  beforeEach(() => {
    jest.spyOn(Icon, 'Icon').mockReturnValue(<div data-testid="Icon" />);
    jest.spyOn(Window, 'Window').mockImplementation(({ children }) => <div data-testid="Window">{children}</div>);
    jest.spyOn(ChatSelection, 'ChatSelection').mockReturnValue(<div data-testid="ChatSelection" />);
    jest.spyOn(MessagesList, 'MessagesList').mockReturnValue(<div data-testid="MessagesList" />);
    jest.spyOn(ChatInput, 'ChatInput').mockReturnValue(<div data-testid="ChatInput" />);
  });

  it('should render correctly', () => {
    render(
      <Chat />,
    );

    const window = screen.queryByTestId('Window');
    const icon = screen.queryByTestId('Icon');
    const chatSelection = screen.queryByTestId('ChatSelection');
    const messagesList = screen.queryByTestId('MessagesList');
    const chatInput = screen.queryByTestId('ChatInput');

    expect(window).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(chatInput).toBeInTheDocument();
    expect(chatSelection).toBeInTheDocument();
    expect(messagesList).toBeInTheDocument();
  });
});
