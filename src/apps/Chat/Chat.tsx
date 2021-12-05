// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

// Assets
import imgSource from 'src/assets/images/icons/chat.svg';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interface
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Icon } from '@Components/Icon/Icon';
import { Window } from '@Components/Window/Window';
import { MessagesList } from '@Chat/components/MessagesList/MessagesList';
import { ChatSelection } from '@Chat/components/ChatSelection/ChatSelection';
import { ChatInput } from '@Chat/components/ChatInput/ChatInput';
import { AddRoomForm } from '@Chat/components/AddRoomForm/AddRoomForm';
import { CurrentChatData } from '@Chat/components/CurrentChatData/CurrentChatData';
import { AuthAppRedirect } from '@Components/AuthAppRedirect/AuthAppRedirect';

// Styles
import styles from './chat.module.css';

export const Chat: FC<ChildrenNever> = React.memo(() => {
  const isAddRoomFormOpen = useSelector((state: RootState) => state.chatRooms.isAddRoomFormOpen);
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <>
      <Icon imgSource={imgSource} type={App.Chat} />
      <Window type={App.Chat}>
        {username === '' ? (<AuthAppRedirect />) : (
          <div className={styles.wrapper}>
            <ChatSelection />
            <div className={styles.rightWrapper}>
              {isAddRoomFormOpen ? (
                <AddRoomForm />
              ) : (
                <>
                  <CurrentChatData />
                  <MessagesList />
                  <ChatInput />
                </>
              )}
            </div>
          </div>
        )}
      </Window>
    </>
  );
});
