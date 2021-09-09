// Libraries
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { Message } from 'src/types/message';

// Components
import { Loading } from 'src/components/Loading';
import { Error } from 'src/components/Error';

// Styles
import styles from './messagesList.module.css';
import { MessageItem } from '../MessageItem';
import { fetchMessages } from '../../redux';

interface Props {
  children?: never;
}

export const MessagesList: FC<Props> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const hasError = useSelector((state: RootState) => state.chat.hasError);

  const listRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    listRef.current!.scrollTop = listRef.current!.scrollHeight;
  }, [messages]);

  const refetch = (): void => {
    dispatch(fetchMessages());
  };

  if (loading && !messages.length) {
    return (
      <div className={styles.wrapper} ref={listRef}>
        <Loading />
      </div>
    );
  }

  if (hasError && !messages.length) {
    return (
      <div className={styles.wrapper} ref={listRef}>
        <Error refetch={refetch} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper} ref={listRef}>
      <ul className={styles.messagesList}>
        {messages.length > 0 && messages.map((message: Message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </ul>
    </div>
  );
};
