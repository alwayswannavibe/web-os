// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { openToDo, closeToDo, toggleCollapseToDo } from 'redux/slices/appsSlicesBus/toDoSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useToDo = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isToDoCollapsed = useSelector((state: RootState) => state.toDo.isToDoCollapsed);
  const isToDoOpen = useSelector((state: RootState) => state.toDo.isToDoOpen);

  const dispatch = useDispatch();

  const handleToDoCollapseToggle = () => {
    if (isToDoCollapsed) {
      dispatch(setWindowActive(Apps.ToDo));
    } else if (apps.indexOf(Apps.ToDo) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseToDo());
  };

  const handleOpenToDo = () => {
    if (isToDoCollapsed && isToDoOpen) {
      dispatch(toggleCollapseToDo());
      dispatch(setWindowActive(Apps.ToDo));
    } else if (!isToDoOpen) {
      dispatch(openToDo());
      dispatch(addWindow(Apps.ToDo));
    }
  };

  const handleCloseToDo = () => {
    if (!isToDoOpen) {
      return;
    }
    dispatch(closeToDo());
    dispatch(deleteWindow(Apps.ToDo));
  };

  return {
    handleOpenToDo,
    handleCloseToDo,
    handleToDoCollapseToggle,
  };
};

export { useToDo };
