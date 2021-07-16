// React, redux
import React, { FC, FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeToDoIconCoord, changeToDoCoord, addToDoItem } from 'src/redux/slices/appsSlicesBus/toDoSlice';
import { ToDoItem } from 'src/apps/ToDoList/components/ToDoItem';

// Types
import { Apps } from 'src/types/apps';

// Assets
import imgSource from 'src/assets/images/icons/toDo.svg';

// Hooks
import { useToDo } from 'src/hooks/useToDo';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './toDoList.module.css';

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
      <Window
        handleClose={handleCloseToDo}
        appType={Apps.ToDo}
        handleCollapse={handleToDoCollapseToggle}
        changeCoord={changeToDoCoord}
        topCoord={toDoTopCoord}
        leftCoord={toDoLeftCoord}
        title={Apps.ToDo}
        zIndexProp={100 - apps.indexOf(Apps.ToDo)}
        isOpen={isToDoOpen && !isToDoCollapsed}
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
    </>
  );
};

export { ToDoList };
