// libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Window from '@Components/Window/Window';
import * as Icon from '@Components/Icon/Icon';
import * as ChatSelection from '@Chat/components/ChatSelection/ChatSelection';
import * as MessagesList from '@Chat/components/MessagesList/MessagesList';
import * as ChatInput from '@Chat/components/ChatInput/ChatInput';
import { Chat } from './Chat';

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
