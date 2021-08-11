// Libraries
import { FC, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

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
    <AnimateSharedLayout>
      <div className={styles.wrapperWithBtn}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.wrapper}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { width: '15rem', opacity: '100%' },
                collapsed: { width: '0px', opacity: 0 },
              }}
              transition={{ duration: 1 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
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
    </AnimateSharedLayout>
  );
};

export { ChatSelection };
