// Libraries
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { addWindow, deleteWindow, setWindowActive, closeApp, openApp, toggleCollapseApp } from 'src/redux/slices/appsSlice';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

const useApp = (type: Apps) => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isCollapsed = useSelector((state: RootState) => state.apps.appsState[type].isCollapsed);
  const isOpened = useSelector((state: RootState) => state.apps.appsState[type].isOpened);

  const dispatch = useDispatch();

  const getAppIndex = () => apps.indexOf(type);

  const handleToggleCollapse = () => {
    if (isOpened && getAppIndex() !== 0) {
      dispatch(setWindowActive(type));
      return;
    }

    if (isCollapsed) {
      dispatch(setWindowActive(type));
    } else if (getAppIndex() === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseApp({ type }));
  };

  const handleOpen = () => {
    if (isCollapsed && isOpened) {
      dispatch(toggleCollapseApp({ type }));
      dispatch(setWindowActive(type));
    } else if (!isOpened) {
      dispatch(openApp({ type }));
      dispatch(addWindow(type));
    }
  };

  const handleClose = () => {
    if (!isOpened) {
      return;
    }
    dispatch(closeApp({ type }));
    dispatch(deleteWindow(type));
  };

  const isIncludeApp = () => apps.includes(type);

  return {
    handleClose,
    handleOpen,
    handleToggleCollapse,
    isIncludeApp,
    getAppIndex,
  };
};

export { useApp };
