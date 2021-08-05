// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Redux
import { toggleCompleteToDoItem, deleteToDoItem } from 'src/redux/slices/appsSlicesBus/toDoSlice';

// Types
import { RootState } from 'src/redux/store';

// Styles
import styles from './toDoItem.module.css';

interface Props {
  children?: never;
  text: string;
  id: string;
}

const ToDoItem: FC<Props> = ({ text, id }: Props) => {
  const dispatch = useDispatch();
  const completed = useSelector(
    (state: RootState) => state.toDo.toDoList[state.toDo.toDoList.findIndex((el) => el.id === id)].completed,
  );

  return (
    <li className={styles.toDoItem} data-cy="todo-item">
      <motion.p
        className={`${styles.text} ${completed ? styles.completed : ''}`}
        initial={{ y: 50, opacity: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {text}
      </motion.p>
      <div className={`${styles.button} ${styles.checkButton}`}>
        <i className="fas fa-check" onClick={() => dispatch(toggleCompleteToDoItem(id))} />
      </div>
      <div className={`${styles.button} ${styles.deleteButton}`}>
        <i className="fas fa-trash-alt" onClick={() => dispatch(deleteToDoItem(id))} />
      </div>
    </li>
  );
};

export { ToDoItem };
