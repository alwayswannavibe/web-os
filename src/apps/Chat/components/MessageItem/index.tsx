// Libraries
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { Message } from 'src/types/message';

// Components
import { Avatar } from 'src/components/Avatar';

// Styles
import styles from './messageItem.module.css';

interface Props {
  children?: never;
  message: Message;
}

const MessageItem: FC<Props> = ({ message }: Props) => {
  const username = useSelector((state: RootState) => state.user.username);

  return (
    <div className={classNames(styles.wrapper, {
      [styles.myMsg]: username === message.username,
    })}
    >
      <motion.li
        className={classNames(styles.msgContainer, {
          [styles.myMsg]: username === message.username,
        })}
        initial={{ y: 50, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Avatar link={message.photo} />
        <div className={styles.msgMain}>
          <div className={styles.msgContent}>
            {message.text}
          </div>
          <div className={classNames(styles.usernameAndDate, {
            [styles.myMsg]: username === message.username,
          })}
          >
            <div className={styles.username}>
              {message.username}
            </div>
            <div className={styles.date}>
              {message.date}
            </div>
          </div>
        </div>
      </motion.li>
    </div>
  );
};

export { MessageItem };
