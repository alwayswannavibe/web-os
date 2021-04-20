// React, Redux
import React, { FC } from 'react';

// Hooks
import { useTerminal } from 'hooks/useTerminal';
import { useSettings } from 'hooks/useSettings';
import { useApps } from 'hooks/useApps';

// Types
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

export const BottomPart: FC<PropsType> = () => {
  const { handleTerminalCollapseToggle, handleOpenTerminal } = useTerminal();
  const { handleSettingsCollapseToggle, handleOpenSettings } = useSettings();
  const { isIncludeApp, getAppIndex } = useApps();

  return (
    <div className={styles.container}>
      {!isIncludeApp(Apps.Terminal) && (
        <div className={`${styles.close} ${styles.tab}`} onClick={handleOpenTerminal}>
          <i className="fas fa-terminal" />
        </div>
      )}
      {isIncludeApp(Apps.Terminal) && (
        <div
          className={getAppIndex(Apps.Terminal) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleTerminalCollapseToggle}
        >
          <i className="fas fa-terminal" />
        </div>
      )}
      {!isIncludeApp(Apps.Settings) && (
        <div className={`${styles.close} ${styles.tab}`} onClick={handleOpenSettings}>
          <i className="fas fa-cogs" />
        </div>
      )}
      {isIncludeApp(Apps.Settings) && (
        <div
          className={getAppIndex(Apps.Settings) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleSettingsCollapseToggle}
        >
          <i className="fas fa-cogs" />
        </div>
      )}
    </div>
  );
};
