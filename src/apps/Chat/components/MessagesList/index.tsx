// Libraries
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { Message } from 'src/types/message';

// Styles
import styles from './messagesList.module.css';
import { MessageItem } from '../MessageItem';

interface Props {
  children?: never;
}

export const MessagesList: FC<Props> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current!.scrollTop = listRef.current!.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.wrapper} ref={listRef}>
      <ul className={styles.messagesList}>
        {messages.map((message: Message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </ul>
    </div>
  );
};
