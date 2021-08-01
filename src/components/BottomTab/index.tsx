// Libraries
import { FC } from 'react';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useApp } from 'src/hooks/useApp';

// Styles
import styles from './style.module.css';

interface Props {
  type: Apps;
  iconName: string;
  children?: never;
}

const BottomTab: FC<Props> = ({ type, iconName }: Props) => {
  const { isIncludeApp, getAppIndex, handleToggleCollapse, handleOpen } = useApp(type);

  return (
    <div data-cy="bottom-tab">
      {!isIncludeApp() && (
        <button type="button" className={`${styles.close} ${styles.tab}`} onClick={handleOpen} aria-label={`${type} bottom icon`}>
          <i className={`fas fa-${iconName}`} />
        </button>
      )}
      {isIncludeApp() && (
        <button
          type="button"
          className={
            getAppIndex() === 0 ? `${styles.isActive} ${styles.tab} ${styles.open}` : `${styles.tab} ${styles.open}`
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
