// Libraries
import { Loading } from '@Components/Loading/Loading';
import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Types
import { RootState } from '@Types/rootState.type';

// Components
import { ToDoItem } from '@ToDo/components/ToDoItem/ToDoItem';
import { Scrollbar } from '@Components/Scrollbar/Scrollbar';

// Styles
import styles from './toDoList.module.css';

const ToDoList: FC<ChildrenNever> = React.memo(() => {
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);
  const isLoading = useSelector((state: RootState) => state.toDo.isToDoListLoading);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [toDoList.length]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Scrollbar>
        <ul className={styles.toDoItemsContainer} ref={listRef}>
          {toDoList.map((toDoItem) => (
            <ToDoItem key={toDoItem.id} text={toDoItem.heading} id={toDoItem.id} />
          ))}
        </ul>
      </Scrollbar>
    </div>
  );
});

export { ToDoList };
