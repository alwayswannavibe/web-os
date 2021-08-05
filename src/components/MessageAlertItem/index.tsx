// Libraries
import { FC } from 'react';

// Types
import { Message } from 'src/types/message';

// Styles
import styles from './messageAlert.module.css';

interface Props {
  children?: never;
  message: Message;
}

export const MessageAlertItem: FC<Props> = ({ message }: Props) => (
  <div>
    <div className={styles.username}>
      <p>{message.username || 'anonymous'}</p>
    </div>
    <p>{message.text}</p>
  </div>
);
