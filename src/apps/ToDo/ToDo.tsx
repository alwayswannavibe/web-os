// Libraries
import React, { FC, FormEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux
import { addToDoItem } from '@ToDo/redux/toDoSlice/toDoSlice';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Assets
import imgSource from '@Icons/toDo.svg';

// Components
import { Window } from '@Components/Window/Window';
import { Icon } from '@Components/Icon/Icon';
import { ToDoItem } from '@ToDo/components/ToDoItem/ToDoItem';

// Styles
import styles from './toDo.module.css';

const ToDo: FC<ChildrenNever> = () => {
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);

  const dispatch = useDispatch();
  const input = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  function addToDo(): void {
    if (input!.current!.value !== '') {
      dispatch(addToDoItem(input?.current!.value));
      input!.current!.value = '';
    }
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    addToDo();
  }

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [toDoList.length]);

  return (
    <>
      <Icon imgSource={imgSource} type={App.ToDo} />
      <Window type={App.ToDo}>
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
              <FontAwesomeIcon icon={faPlus} onClick={addToDo} />
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};

export { ToDo };
