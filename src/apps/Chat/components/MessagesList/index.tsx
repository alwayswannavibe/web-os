// React, redux
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// Types
import { Message } from 'src/types/message';

// Styles
import styles from './messagesList.module.css';
import { MessageItem } from '../MessageItem';

type PropsType = {
  children?: never;
};

export const MessagesList: FC<PropsType> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.messagesList}>
        {messages.map((message: Message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </ul>
    </div>
  );
};
