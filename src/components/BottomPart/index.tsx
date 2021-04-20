// React
import React, { FC } from 'react';

// Redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { openTerminal, toggleCollapseTerminal } from 'redux/slices/terminalSlice';
import { openSettings, toggleCollapseSettings } from 'redux/slices/settingsSlice';
import { addWindow, setWindowActive } from 'redux/slices/appsSlice';

// type import
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const BottomPart: FC<PropsType> = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);
  const dispatch = useDispatch();

  const handleTerminalClick = () => {
    dispatch(toggleCollapseTerminal());
    if (isTerminalCollapsed) {
      dispatch(setWindowActive(Apps.Terminal));
    } else if (apps.indexOf(Apps.Terminal) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  const handleSettingsClick = () => {
    dispatch(toggleCollapseSettings());
    if (isSettingsCollapsed) {
      dispatch(setWindowActive(Apps.Settings));
    } else if (apps.indexOf(Apps.Settings) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  const handleOpenTerminal = () => {
    dispatch(openTerminal());
    dispatch(addWindow(Apps.Terminal));
  };

  const handleOpenSettings = () => {
    dispatch(openSettings());
    dispatch(addWindow(Apps.Settings));
  };

  return (
    <div className={styles.container}>
      {!apps.includes(Apps.Terminal) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className={`${styles.close} ${styles.tab}`} onClick={handleOpenTerminal}>
          <i className="fas fa-terminal" />
        </div>
      )}
      {apps.includes(Apps.Terminal) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className={apps.indexOf(Apps.Terminal) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleTerminalClick}
        >
          <i className="fas fa-terminal" />
        </div>
      )}
      {!apps.includes(Apps.Settings) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className={`${styles.close} ${styles.tab}`} onClick={handleOpenSettings}>
          <i className="fas fa-cogs" />
        </div>
      )}
      {apps.includes(Apps.Settings) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className={apps.indexOf(Apps.Settings) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleSettingsClick}
        >
          <i className="fas fa-cogs" />
        </div>
      )}
    </div>
  );
};
