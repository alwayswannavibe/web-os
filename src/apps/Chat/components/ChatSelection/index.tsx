// Libraries
import { FC, useState } from 'react';
import classNames from 'classnames';

// Components
import { ChatSelectionElement } from '../ChatSelectionElement';

// Styles
import styles from './chatSelection.module.css';

interface Props {
  children?: never;
}

const ChatSelection: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.wrapperWithBtn}>
      {isOpen && (
        <div className={styles.wrapper}>
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
          <ChatSelectionElement
            name="Name Lastname"
            lastVisitDate="Online"
            hasNewMessage={false}
            avatarLink=""
            countOfNewMessages={0}
          />
        </div>
      )}
      <button
        type="button"
        className={
          classNames(styles.togglevisiblityBtn, {
            [styles.closeBtn]: !isOpen,
          })
        }
        onClick={handleClick}
      >
        {isOpen ? '←' : '→'}
      </button>
    </div>
  );
};

export { ChatSelection };
