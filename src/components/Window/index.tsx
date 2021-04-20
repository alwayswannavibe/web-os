// React
import React, { FC, ReactNode, useRef } from 'react';

// types import
import { CoordsType } from 'types/coord';

// Redux
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// Hooks
import { useDragNDrop } from 'hooks/useDragNDrop';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  title: string;
  handleClose: () => void;
  handleCollapse: () => void;
  handleSetActive: () => void;
  topCoord: string;
  leftCoord: string;
  zIndexProp: number;
  changeCoord: ActionCreatorWithPayload<CoordsType, string>;
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
};

export const Window: FC<PropsType> = ({
  handleClose,
  handleCollapse,
  title,
  children,
  topCoord,
  leftCoord,
  changeCoord,
  zIndexProp,
  handleSetActive,
}: PropsType) => {
  const windowTop = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, windowTop, topCoord, leftCoord);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={styles.window} style={{ top: topCoordLocal, left: leftCoordLocal, zIndex: zIndexProp }}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className={styles.windowTop} onMouseDown={startDrag} ref={windowTop}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={handleSetActive} className={styles.title}>
          {title}
        </div>
        <div className={styles.buttonsContainer}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={`${styles.collapseBtn} ${styles.btn}`} onClick={handleCollapse}>
            <i className="fas fa-window-minimize" />
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={`${styles.closeBtn} ${styles.btn}`} onClick={handleClose}>
            <i className="fas fa-times" />
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.windowBody} onClick={handleSetActive}>
        {children}
      </div>
    </div>
  );
};
