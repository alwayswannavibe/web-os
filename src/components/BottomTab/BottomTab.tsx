// Libraries
import React, { FC } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Enums
import { App } from '@Enums/app.enum';

// Hooks
import { useApp } from '@Hooks/useApp/useApp';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './bottomTab.module.css';

interface Props extends ChildrenNever {
  type: App;
  icon: IconDefinition;
}

const BottomTab: FC<Props> = ({ type, icon }: Props) => {
  const { isIncludeApp, getAppIndex, handleToggleCollapse, handleOpen } = useApp(type);

  return (
    <div data-cy="bottom-tab">
      {!isIncludeApp() && (
        <Button className={`${styles.close} ${styles.tab}`} onClick={handleOpen} aria-label={`${type} bottom icon`}>
          <FontAwesomeIcon icon={icon} />
        </Button>
      )}
      {isIncludeApp() && (
        <Button
          className={
            getAppIndex() === 0 ? `${styles.isActive} ${styles.tab} ${styles.open}` : `${styles.tab} ${styles.open}`
          }
          onClick={handleToggleCollapse}
        >
          <FontAwesomeIcon icon={icon} />
        </Button>
      )}
    </div>
  );
};

export { BottomTab };
