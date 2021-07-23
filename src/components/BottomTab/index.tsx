// React, redux
import { FC } from 'react';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useApps } from 'src/hooks/useApps';

// Styles
import styles from './style.module.css';
import { useApp } from '../../hooks/useApp';

type PropsType = {
  type: Apps;
  iconName: string;
  children?: never;
};

const BottomTab: FC<PropsType> = ({ type, iconName }: PropsType) => {
  const { isIncludeApp, getAppIndex } = useApps();
  const { handleToggleCollapse, handleOpen } = useApp(type);

  return (
    <div data-cy="bottom-tab">
      {!isIncludeApp(type) && (
        <button type="button" className={`${styles.close} ${styles.tab}`} onClick={handleOpen} aria-label={`${type} bottom icon`}>
          <i className={`fas fa-${iconName}`} />
        </button>
      )}
      {isIncludeApp(type) && (
        <button
          type="button"
          className={
            getAppIndex(type) === 0 ? `${styles.isActive} ${styles.tab} ${styles.open}` : `${styles.tab} ${styles.open}`
          }
          onClick={handleToggleCollapse}
        >
          <i className={`fas fa-${iconName}`} />
        </button>
      )}
    </div>
  );
};

export { BottomTab };
