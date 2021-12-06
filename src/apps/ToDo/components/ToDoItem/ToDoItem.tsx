// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

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
  const completed = useSelector(
    (state: RootState) => state.toDo.toDoList[state.toDo.toDoList.findIndex((el) => el.id === id)].completed,
  );

  const { t } = useTranslation('toDo');
  const dispatch = useDispatch();

  return (
    <li className={styles.toDoItem} data-cy="todo-item">
      <motion.p
        className={`${styles.text} ${completed ? styles.completed : ''}`}
        initial={{ y: 50, opacity: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {text}
      </motion.p>
      <Button
        className={classNames(styles.button, {
          [styles.checkButton]: !completed,
          [styles.uncheckButton]: completed,
        })}
        onClick={() => dispatch(toggleCompleteToDoItem(id))}
        aria-label={`${t('toggleItemWithText')} ${text}`}
      >
        {completed ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faCheck} />}
      </Button>
      <Button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={() => dispatch(deleteToDoItem(id))}
        aria-label={`${t('deleteItemWithText')} ${text}`}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </li>
  );
});

export { ToDoItem };
