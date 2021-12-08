// Libraries
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Assets
import imgSource from '@Icons/toDo.svg';

// Components
import { Window } from '@Components/Window/Window';
import { Icon } from '@Components/Icon/Icon';
import { ToDoList } from '@ToDo/components/ToDoList/ToDoList';
import { ToDoInput } from '@ToDo/components/ToDoInput/ToDoInput';
import { ToDoItemDetails } from '@ToDo/components/ToDoItemDetails/ToDoItemDetails';

// Styles
import styles from './toDo.module.css';

const ToDo: FC<ChildrenNever> = React.memo(() => {
  const activeToDoPage = useSelector((state: RootState) => state.toDo.activeToDoPage);

  return (
    <>
      <Icon imgSource={imgSource} type={App.ToDo} />
      <Window type={App.ToDo}>
        <div className={styles.container}>
          {activeToDoPage !== '' ? <ToDoItemDetails id={activeToDoPage} /> : (
            <>
              <ToDoList />
              <ToDoInput />
            </>
          )}
        </div>
      </Window>
    </>
  );
});

export { ToDo };
