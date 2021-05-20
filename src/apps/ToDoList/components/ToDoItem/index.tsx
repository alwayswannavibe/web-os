import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompleteToDoItem, deleteToDoItem } from 'redux/slices/appsSlicesBus/toDoSlice';
import { RootState } from 'redux/store';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

type PropsType = {
  children?: never;
  text: string;
  id: string;
};

const ToDoItem: FC<PropsType> = ({ text, id }: PropsType) => {
  const dispatch = useDispatch();
  const completed = useSelector(
    (state: RootState) => state.toDo.toDoList[state.toDo.toDoList.findIndex((el) => el.id === id)].completed,
  );

  return (
    <div className={styles.toDoItem}>
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
    </div>
  );
};

export { ToDoItem };
