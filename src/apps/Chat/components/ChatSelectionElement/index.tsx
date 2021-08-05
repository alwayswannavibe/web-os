// Libraries
import classNames from 'classnames';
import { FC } from 'react';

// Components
import { Avatar } from 'src/components/Avatar';

// Styles
import styles from './chatSelectionElement.module.css';

interface Props {
  children?: never;
  name: string;
  lastVisitDate: string;
  hasNewMessage: boolean;
  countOfNewMessages: number;
  lastMessage?: string;
  avatarLink: string;
}

const ChatSelectionElement: FC<Props> = (
  { name, lastMessage, hasNewMessage, countOfNewMessages, lastVisitDate, avatarLink }: Props,
) => (
  <div
    className={
      classNames(styles.wrapper, {
        [styles.newMessage]: hasNewMessage,
      })
    }
  >
    {hasNewMessage && (
      <>
        <div>
          <span>{}</span>
          <span>{lastMessage}</span>
        </div>
        <div>
          <span>{countOfNewMessages}</span>
        </div>
      </>
    )}
    <div className={styles.nameAndDate}>
      <div>
        <span>{lastVisitDate}</span>
      </div>
      <div>
        <span>{name}</span>
      </div>
    </div>
    <div className={styles.avatar}>
      <Avatar link={avatarLink} />
    </div>
  </div>
);

export { ChatSelectionElement };
