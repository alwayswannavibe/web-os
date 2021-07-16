// React, redux
import { FC } from 'react';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useApps } from 'src/hooks/useApps';

// Styles
import styles from './style.module.css';

type PropsType = {
  handleOpen: () => void;
  handleCollapse: () => void;
  type: Apps;
  iconName: string;
  children?: never;
};

const BottomTab: FC<PropsType> = ({ handleOpen, handleCollapse, type, iconName }: PropsType) => {
  const { isIncludeApp, getAppIndex } = useApps();

  return (
    <div data-cy="bottom-tab">
      {!isIncludeApp(type) && (
        <div className={`${styles.close} ${styles.tab}`} onClick={handleOpen}>
          <i className={`fas fa-${iconName}`} />
        </div>
      )}
      {isIncludeApp(type) && (
        <div
          className={
            getAppIndex(type) === 0 ? `${styles.isActive} ${styles.tab} ${styles.open}` : `${styles.tab} ${styles.open}`
          }
          onClick={handleCollapse}
        >
          <i className={`fas fa-${iconName}`} />
        </div>
      )}
    </div>
  );
};

export { BottomTab };
