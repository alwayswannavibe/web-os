// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeSettings, openSettings, toggleCollapseSettings } from 'redux/slices/settingsSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useSettings = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);

  const dispatch = useDispatch();

  const handleSettingsCollapseToggle = () => {
    dispatch(toggleCollapseSettings());
    if (isSettingsCollapsed) {
      dispatch(setWindowActive(Apps.Settings));
    } else if (apps.indexOf(Apps.Settings) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  const handleOpenSettings = () => {
    dispatch(openSettings());
    dispatch(addWindow(Apps.Settings));
  };

  const handleCloseSettings = () => {
    dispatch(closeSettings());
    dispatch(deleteWindow(Apps.Settings));
  };

  return { handleSettingsCollapseToggle, handleOpenSettings, handleCloseSettings };
};

export { useSettings };
