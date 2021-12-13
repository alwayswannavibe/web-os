// Libraries
import React, { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Utils
import { isLoggedIn } from '@Utils/isLoggedIn';

// Redux
import { addToDoItem, addToDoItemLocal } from '@ToDo/redux/toDoSlice/toDoSlice';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './ToDoInput.module.css';

const ToDoInput: FC<ChildrenNever> = React.memo(() => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { t } = useTranslation('toDo');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (text !== '') {
      if (isLoggedIn()) {
        dispatch(addToDoItem(text));
      } else {
        dispatch(addToDoItemLocal(text));
      }
      setText('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <div className={styles.addContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.input}
          value={text}
          autoFocus
          onChange={handleChange}
        />
      </form>
      <Button className={styles.addItemButton} onClick={handleSubmit} aria-label={t('addToDoItem')}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
});

export { ToDoInput };
