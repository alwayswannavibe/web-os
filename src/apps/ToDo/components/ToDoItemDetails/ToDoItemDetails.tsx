import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { ChildrenNever } from '@Interfaces/childrenNever.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Types/rootState.type';
import classNames from 'classnames';
import { Button } from '@Components/Button/Button';
import { changeActiveToDoPage, updateToDoItem } from '@ToDo/redux/toDoSlice/toDoSlice';
import { useTranslation } from 'react-i18next';
import styles from './ToDoItemDetails.module.css';

interface Props extends ChildrenNever {
  id: string;
}

const ToDoItemDetails: FC<Props> = ({ id }: Props) => {
  const toDoItem = useSelector((state: RootState) => state.toDo.toDoList[state.toDo.toDoList.findIndex((el) => el.id === id)]);

  const [text, setText] = useState(toDoItem.heading);
  const [description, setDescription] = useState(toDoItem.description);
  const [isComplete, setIsComplete] = useState(toDoItem.isComplete);
  const [isEditable, setIsEditable] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { t } = useTranslation('toDo');

  // Add useEffect because focus in setIsEditableToTrue don't work on first click
  useEffect(() => {
    if (!isEditable) {
      return;
    }
    nameRef.current?.focus();
  }, [isEditable]);

  function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function handleChangeIsComplete() {
    setIsComplete((prev) => !prev);
  }

  function setIsEditableToTrue() {
    setIsEditable(true);
  }

  function handleBack() {
    dispatch(changeActiveToDoPage(''));
  }

  function handleCancel() {
    setIsEditable(false);
  }

  function handleSave() {
    dispatch(updateToDoItem({
      id, description, heading: text, isComplete,
    }));
    setIsEditable(false);
  }

  return (
    <form className={styles.form}>
      <label htmlFor="toDoDetailsHeadingInput" className={styles.label}>
        <span>{`${t('heading')}:`}</span>
        <input
          type="text"
          id="toDoDetailsHeadingInput"
          className={styles.input}
          value={text}
          onChange={handleChangeName}
          disabled={!isEditable}
          ref={nameRef}
        />
      </label>
      <label htmlFor="toDoDetailsDescriptionInput" className={classNames(styles.label, styles.textareaLabel)}>
        <span>{`${t('description')}:`}</span>
        <textarea
          id="toDoDetailsDescriptionInput"
          className={styles.textarea}
          value={description}
          onChange={handleChangeDescription}
          disabled={!isEditable}
        />
      </label>
      <label htmlFor="toDoDetailsStatus" className={styles.status}>
        <span>{`${t('status')}: ${isComplete ? t('completed') : t('inProcess')}`}</span>
        {isEditable && (
          <Button className={styles.changeStatusBtn} onClick={handleChangeIsComplete} aria-label={t('changeStatus')}>
            {t('change')}
          </Button>
        )}
      </label>
      <div className={styles.buttons}>
        {!isEditable ?
          (<Button onClick={handleBack} className={styles.bottomBtn}>{t('back')}</Button>)
          : <Button onClick={handleCancel} className={styles.bottomBtn}>{t('cancel')}</Button>}
        {!isEditable ?
          <Button onClick={setIsEditableToTrue} className={styles.bottomBtn}>{t('edit')}</Button>
          : <Button className={styles.bottomBtn} onClick={handleSave}>{t('save')}</Button>}
      </div>
    </form>
  );
};

export { ToDoItemDetails };
