// Libraries
import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Scrollbars } from 'react-custom-scrollbars';

// Redux
import {
  fetchUsers,
} from '@Chat/redux/chatUsersSlice/chatUsersSlice';
import { fetchRooms } from '@Chat/redux/chatRoomsSlice/chatRooms';

// Types
import { RootState } from '@Types/rootState.type';

// Interface
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { SelectionCategory } from './components/SelectionCategory/SelectionCategory';

// Styles
import styles from './chatSelection.module.css';

const ChatSelection: FC<ChildrenNever> = () => {
  const users = useSelector((state: RootState) => state.chatUsers.users);
  const rooms = useSelector((state: RootState) => state.chatRooms.rooms);

  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRooms());
  }, [dispatch]);

  function handleClick(): void {
    setIsOpen(!isOpen);
  }

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
              <Scrollbars
                renderView={(({ style, ...props }) => {
                  const viewStyle = {
                    paddingRight: 12,
                  };
                  return (
                    <div style={{ ...style, ...viewStyle }} {...props} />
                  );
                })}
                autoHide={false}
              >
                <SelectionCategory items={rooms} itemsType="Room" categoryName="Rooms" />
                <SelectionCategory items={users} itemsType="User" categoryName="Users" />
              </Scrollbars>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          className={
            classNames(styles.toggleVisibilityBtn, {
              [styles.closeBtn]: !isOpen,
            })
          }
          onClick={handleClick}
        >
          {isOpen ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
        </button>
      </div>
    </AnimateSharedLayout>
  );
};

export { ChatSelection };
