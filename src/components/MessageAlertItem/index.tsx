// React, redux
import React, { FC } from 'react';

// Types
import { Message } from 'src/types/message';

// Styles
import styles from './messageAlert.module.css';

type PropsType = {
  children?: never;
  message: Message;
};

export const MessageAlertItem: FC<PropsType> = ({ message }: PropsType) => (
  <div>
    <div className={styles.username}>
      <p>{message.username || 'anonymous'}</p>
    </div>
    <p>{message.text}</p>
  </div>
);
