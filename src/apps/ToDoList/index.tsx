// React, redux
import React, { FC, FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDoItem } from 'src/redux/slices/appsSlicesBus/toDoSlice';
import { ToDoItem } from 'src/apps/ToDoList/components/ToDoItem';
import { RootState } from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

// Assets
import imgSource from 'src/assets/images/icons/toDo.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './toDoList.module.css';

type PropsType = {
  children?: never;
};

const ToDoList: FC<PropsType> = () => {
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);

  const dispatch = useDispatch();
  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (input!.current!.value !== '') {
      dispatch(addToDoItem(input?.current!.value));
      input!.current!.value = '';
    }
  };

  const handleClick = () => {
    if (input!.current!.value !== '') {
      dispatch(addToDoItem(input?.current!.value));
      input!.current!.value = '';
    }
  };

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.ToDo} />
      <Window type={Apps.ToDo}>
        <div className={styles.container}>
          <div className={styles.toDoItemsContainer}>
            {toDoList.map((toDoItem) => (
              <ToDoItem key={toDoItem.id} text={toDoItem.text} id={toDoItem.id} />
            ))}
          </div>
          <div className={styles.addContainer}>
            <form onSubmit={handleSubmit}>
              <input type="text" className={styles.input} ref={input} />
            </form>
            <div className={styles.addItemButton}>
              <i className="fas fa-plus" onClick={handleClick} />
            </div>
          </div>
        </div>
      </Window>
    </>
  );
};

export { ToDoList };
