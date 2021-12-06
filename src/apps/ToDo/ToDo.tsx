// Libraries
import React, { FC } from 'react';

// Enums
import { App } from '@Enums/app.enum';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Assets
import imgSource from '@Icons/toDo.svg';

// Components
import { Window } from '@Components/Window/Window';
import { Icon } from '@Components/Icon/Icon';
import { ToDoList } from '@ToDo/components/ToDoList/ToDoList';
import { ToDoInput } from '@ToDo/components/ToDoInput/ToDoInput';

// Styles
import styles from './toDo.module.css';

const ToDo: FC<ChildrenNever> = React.memo(() => (
  <>
    <Icon imgSource={imgSource} type={App.ToDo} />
    <Window type={App.ToDo}>
      <div className={styles.container}>
        <ToDoList />
        <ToDoInput />
      </div>
    </Window>
  </>
));

export { ToDo };
