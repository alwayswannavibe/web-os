import React, { FC, FormEvent, useRef } from 'react';
import { Apps } from 'types/apps';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Icon } from 'components/Icon';
import { useToDo } from 'hooks/useToDo';
import { changeToDoIconCoord, changeToDoCoord, addToDoItem } from 'redux/slices/toDoSlice';
import imgSource from 'assets/images/icons/toDo.svg';
import { Window } from 'components/Window';
import { ToDoItem } from 'apps/ToDoList/components/ToDoItem';
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

const ToDoList: FC<PropsType> = () => {
  const dispatch = useDispatch();
  const isToDoOpen = useSelector((state: RootState) => state.toDo.isToDoOpen);
  const isToDoCollapsed = useSelector((state: RootState) => state.toDo.isToDoCollapsed);
  const toDoIconTopCoord = useSelector((state: RootState) => state.toDo.toDoIconTopCoord);
  const toDoIconLeftCoord = useSelector((state: RootState) => state.toDo.toDoIconLeftCoord);
  const toDoTopCoord = useSelector((state: RootState) => state.toDo.toDoTopCoord);
  const toDoLeftCoord = useSelector((state: RootState) => state.toDo.toDoLeftCoord);
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const { handleOpenToDo, handleCloseToDo, handleToDoCollapseToggle } = useToDo();
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
      <Icon
        title={Apps.ToDo}
        topCoord={toDoIconTopCoord}
        leftCoord={toDoIconLeftCoord}
        handleClick={handleOpenToDo}
        changeCoord={changeToDoIconCoord}
        imgSource={imgSource}
      />
      {isToDoOpen && !isToDoCollapsed && (
        <Window
          handleClose={handleCloseToDo}
          appType={Apps.ToDo}
          handleCollapse={handleToDoCollapseToggle}
          changeCoord={changeToDoCoord}
          topCoord={toDoTopCoord}
          leftCoord={toDoLeftCoord}
          title={Apps.ToDo}
          zIndexProp={100 - apps.indexOf(Apps.ToDo)}
        >
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
      )}
    </>
  );
};

export { ToDoList };
