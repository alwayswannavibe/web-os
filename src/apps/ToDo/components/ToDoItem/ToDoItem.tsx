// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Redux
import { toggleCompleteToDoItem, deleteToDoItem } from '@ToDo/redux/toDoSlice/toDoSlice';

// Types
import { RootState } from '@Types/rootState.type';

// Components
import { Button } from '@Components/Button/Button';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './toDoItem.module.css';

interface Props extends ChildrenNever {
  text: string;
  id: string;
}

const ToDoItem: FC<Props> = React.memo(({ text, id }: Props) => {
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
      <Button className={`${styles.button} ${styles.checkButton}`} onClick={() => dispatch(toggleCompleteToDoItem(id))}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button className={`${styles.button} ${styles.deleteButton}`} onClick={() => dispatch(deleteToDoItem(id))}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </li>
  );
});

export { ToDoItem };
