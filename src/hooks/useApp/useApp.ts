// Libraries
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  setWindowActive,
  closeApp,
  openApp,
  toggleCollapseApp,
  setWindowSize,
} from 'src/redux/slices/appsSlice/appsSlice';

// Utils
import { getRemFromPx } from '@Utils/getRemFromPx';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

const useApp = (type: App) => {
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
    dispatch(toggleCollapseApp(type));
  };

  const handleOpen = () => {
    if (isCollapsed && isOpened) {
      dispatch(toggleCollapseApp(type));
      dispatch(setWindowActive(type));
    } else if (!isOpened) {
      dispatch(openApp(type));
    }
  };

  const handleClose = () => {
    if (!isOpened) {
      return;
    }
    dispatch(closeApp(type));
  };

  const isIncludeApp = () => apps.includes(type);

  function handleResize(newWidth: number, newHeight: number) {
    console.log(getRemFromPx(newWidth));
    dispatch(setWindowSize({
      type,
      newWidth: `${getRemFromPx(newWidth)}rem`,
      newHeight: `${getRemFromPx(newHeight)}rem`,
    }));
  }

  return {
    handleClose,
    handleOpen,
    handleResize,
    handleToggleCollapse,
    isIncludeApp,
    getAppIndex,
  };
};

export { useApp };
