// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeSettings, openSettings, toggleCollapseSettings } from 'redux/slices/appsSlicesBus/settingsSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useSettings = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);
  const isSettingsOpen = useSelector((state: RootState) => state.settings.isSettingsOpen);

  const dispatch = useDispatch();

  const handleSettingsCollapseToggle = () => {
    if (isSettingsCollapsed) {
      dispatch(setWindowActive(Apps.Settings));
    } else if (apps.indexOf(Apps.Settings) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseSettings());
  };

  const handleOpenSettings = () => {
    if (isSettingsCollapsed && isSettingsOpen) {
      dispatch(toggleCollapseSettings());
      dispatch(setWindowActive(Apps.Settings));
    } else if (!isSettingsOpen) {
      dispatch(openSettings());
      dispatch(addWindow(Apps.Settings));
    }
  };

  const handleCloseSettings = () => {
    if (!isSettingsOpen) {
      return;
    }
    dispatch(closeSettings());
    dispatch(deleteWindow(Apps.Settings));
  };

  return {
    handleSettingsCollapseToggle,
    handleOpenSettings,
    handleCloseSettings,
  };
};

export { useSettings };
