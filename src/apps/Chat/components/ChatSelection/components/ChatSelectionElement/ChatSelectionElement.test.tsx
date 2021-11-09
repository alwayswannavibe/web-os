// Libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Avatar from '@Components/Avatar/Avatar';
import { ChatSelectionElement } from './ChatSelectionElement';

describe('ChatSelectionElement', () => {
  beforeEach(() => {
    jest.spyOn(Avatar, 'Avatar')
      .mockReturnValue(<div className="AvatarTest" />);
  });

  describe('should render correctly', () => {
    it('should render correctly if it has not new messages', () => {
      render(
        <ChatSelectionElement
          name="John"
          countOfNewMessages={0}
          avatarLink="test"
          lastVisitDate="02.05.2015"
          changeChat={() => {
          }}
          userId={2}
        />,
      );

      const lastVisitDate = screen.queryByText('02.05.2015');
      const name = screen.queryByText('John');
      const countOfNewMessages = screen.queryByText('0');
      const avatar = document.getElementsByClassName('AvatarTest');

      expect(lastVisitDate)
        .toBeInTheDocument();
      expect(name)
        .toBeInTheDocument();
      expect(avatar).toHaveLength(2);
      expect(countOfNewMessages)
        .not
        .toBeInTheDocument();
    });

    it('should render correctly if it has new messages', () => {
      render(
        <ChatSelectionElement
          name="John"
          countOfNewMessages={1}
          avatarLink="test"
          userId={2}
          lastVisitDate="02.05.2015"
          lastMessage={{
            text: 'test',
            createdAt: new Date(),
            listOfReaders: [],
            id: 1,
            owner: {
              username: 'testUser',
              photo: '',
              id: 2,
            },
          }}
          changeChat={() => {
          }}
        />,
      );

      const lastVisitDate = screen.queryByText('02.05.2015');
      const name = screen.queryByText('John');
      const countOfNewMessages = screen.queryByText('1');
      const avatar = document.getElementsByClassName('AvatarTest');
      const lastMessage = screen.queryByText('Hello');

      expect(lastVisitDate)
        .toBeInTheDocument();
      expect(name)
        .toBeInTheDocument();
      expect(avatar).toHaveLength(2);
      expect(countOfNewMessages)
        .toBeInTheDocument();
      expect(lastMessage)
        .toBeInTheDocument();
    });
  });
});
