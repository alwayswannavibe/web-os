// Libraries
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Redux
import { addMessageInputValue } from 'src/apps/Chat/redux';

// Types
import { Message } from 'src/types/message';
import { RootState } from 'src/redux/store';

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
  const dispatch = useDispatch();

  const handleClickUsername = () => {
    dispatch(addMessageInputValue(`@${message.username}, `));
  };

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
          <div className={classNames(styles.msgContent, {
            [styles.toYou]: message.text.includes(`@${username}`) || message.text.toLowerCase().includes('@all'),
          })}
          >
            {message.text.slice(0, 4) === 'http' ? (
              <a href={message.text} target="_blank" rel="noreferrer"><img src={message.text} alt={message.text} /></a>
            ) : (
              <span>{message.text}</span>
            )}
          </div>
          <div className={classNames(styles.usernameAndDate, {
            [styles.myMsg]: username === message.username,
          })}
          >
            <div className={styles.username}>
              <button type="button" onClick={handleClickUsername}>{message.username}</button>
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
