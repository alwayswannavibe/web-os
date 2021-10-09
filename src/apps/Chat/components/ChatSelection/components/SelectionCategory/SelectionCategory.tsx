// Libraries
import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';
import { User } from '@Interfaces/user.interface';
import { Room } from '@Apps/Chat/interfaces/room';

// Components
import { UserSelectionItems } from '../UserSelectionItems/UserSelectionItems';
import { RoomSelectionItems } from '../RoomSelectionItems/RoomSelectionItems';

// Styles
import styles from './selectionCategory.module.css';

interface Props extends ChildrenNever {
  items: User[] | Room[],
  itemsType: string,
  categoryName: string,
}

const SelectionCategory: FC<Props> = ({ items, itemsType, categoryName }: Props) => {
  const [visibleItems, setVisibleItems] = useState(items);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  function getFilteredItems(filterExp: string): User[] | Room[] {
    if (itemsType === 'User') {
      return (items as User[]).filter((item) => item.username.includes(filterExp));
    }
    return (items as Room[]).filter((item) => item.name.includes(filterExp));
  }

  function handleChangeSearch(event: any): void {
    setVisibleItems(getFilteredItems(event.target.value));
  }

  function handleToggleCollapse(): void {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={styles.selectContainer}>
      <div className={styles.category}>
        <p className={styles.categoryName}>{categoryName}</p>
        <button type="button" onClick={handleToggleCollapse} className={styles.toggleCollapseButton}>
          {!isCollapsed ? (<FontAwesomeIcon icon={faAngleUp} />) : (<FontAwesomeIcon icon={faAngleDown} />)}
        </button>
      </div>
      <div className={styles.findContainer}>
        <input type="text" className={styles.findInput} onChange={handleChangeSearch} />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className={styles.wrapper}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: '100%' },
              collapsed: { height: '0px', opacity: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            {
              itemsType === 'User' ?
                (<UserSelectionItems users={visibleItems as User[]} />)
                : (<RoomSelectionItems rooms={visibleItems as Room[]} />)
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { SelectionCategory };
