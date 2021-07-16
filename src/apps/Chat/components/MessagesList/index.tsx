import { Message } from 'src/types/message';
import { motion } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import styles from './messagesList.module.css';

type PropsType = {
  children?: never;
};

export const MessagesList: FC<PropsType> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    const messagesList = document.getElementsByClassName(styles.otherMsg);
    messagesList[messagesList.length - 1]?.scrollIntoView();
  }, [messages]);

  return (
    <ul className={styles.messagesList}>
      {messages.map((message: Message) => (
        <motion.li
          className={`${styles.msgContainer} ${username === message.username ? styles.myMsg : ''}`}
          key={message.id}
          initial={{ y: 50, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <img
            src={
              message.photo ||
              'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
            }
            alt="avatar"
            width="60px"
            height="60px"
            className={styles.avatar}
          />
          <div className={styles.nameAndMsgContainer}>
            <div className={styles.ownerAndDateContainer}>
              <p className={styles.msgOwner}>{message.username || 'anonymous'}</p>
              <p className={styles.msgDate}>{message.date || ''}</p>
            </div>
            <p className={styles.otherMsg}>{message.text}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};
