// Libraries
import { FC } from 'react';

// Assets
import imgSource from 'src/assets/images/icons/chat.svg';

// Types
import { Apps } from 'src/types/apps';

// Components
import { Icon } from 'src/components/Icon';
import { Window } from 'src/components/Window';
import { MessagesList } from './components/MessagesList';
import { ChatSelection } from './components/ChatSelection';
import { ChatInput } from './components/ChatInput';

// Styles
import styles from './chat.module.css';

interface Props {
  children?: never;
}

export const Chat: FC<Props> = () => (
  <>
    <Icon imgSource={imgSource} type={Apps.Chat} />
    <Window type={Apps.Chat}>
      <div className={styles.wrapper}>
        <ChatSelection />
        <div className={styles.rightWrapper}>
          <MessagesList />
          <ChatInput />
        </div>
      </div>
    </Window>
  </>
);
