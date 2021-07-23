// React, redux
import React, { FC, FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { addToDoItem } from 'src/redux/slices/appsSlicesBus/toDoSlice';
import { ToDoItem } from 'src/apps/ToDoList/components/ToDoItem';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Types
import { Apps } from 'src/types/apps';

// Assets
import imgSource from 'src/assets/images/icons/toDo.svg';

// Hooks
import { useApp } from 'src/hooks/useApp';

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
  const isToDoOpen = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].isOpened);
  const isToDoCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].isCollapsed);
  const toDoIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].iconPos.top);
  const toDoIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].iconPos.left);
  const toDoTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].windowPos.top);
  const toDoLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.ToDo].windowPos.left);
  const toDoList = useSelector((state: RootState) => state.toDo.toDoList);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const { handleOpen, handleClose, handleToggleCollapse } = useApp(Apps.ToDo);
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
        handleClick={handleOpen}
        changeCoord={changeIconPos}
        imgSource={imgSource}
        type={Apps.ToDo}
      />
      <Window
        handleClose={handleClose}
        type={Apps.ToDo}
        handleCollapse={handleToggleCollapse}
        changeCoord={changeWindowPos}
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
