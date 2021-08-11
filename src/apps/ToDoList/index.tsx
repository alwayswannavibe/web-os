// Libraries
import React, { FC, FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { addToDoItem } from 'src/apps/ToDoList/redux';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

// Assets
import imgSource from 'src/assets/images/icons/toDo.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { ToDoItem } from 'src/apps/ToDoList/components/ToDoItem';

// Styles
import styles from './toDoList.module.css';

interface Props {
  children?: never;
}

const ToDoList: FC<Props> = () => {
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);

  const dispatch = useDispatch();
  const input = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const addToDo = () => {
    if (input!.current!.value !== '') {
      dispatch(addToDoItem(input?.current!.value));
      input!.current!.value = '';
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addToDo();
  };

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [toDoList.length]);

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.ToDo} />
      <Window type={Apps.ToDo}>
        <div className={styles.container}>
          <ul className={styles.toDoItemsContainer} ref={listRef}>
            {toDoList.map((toDoItem) => (
              <ToDoItem key={toDoItem.id} text={toDoItem.text} id={toDoItem.id} />
            ))}
          </ul>
          <div className={styles.addContainer}>
            <form onSubmit={handleSubmit}>
              <input type="text" className={styles.input} ref={input} autoFocus />
            </form>
            <div className={styles.addItemButton}>
              <i className="fas fa-plus" onClick={addToDo} />
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};

export { ToDoList };
