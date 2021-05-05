// React and Redux
import React, { FC, ReactNode, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setWindowActive } from 'redux/slices/appsSlice';

// types import
import { CoordsType } from 'types/coord';

// Hooks
import { useDragNDrop } from 'hooks/useDragNDrop';

// Types
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';

type PropsType = {
  title: string;
  handleClose: () => void;
  handleCollapse: () => void;
  appType: Apps;
  topCoord: string;
  leftCoord: string;
  zIndexProp: number;
  changeCoord: ActionCreatorWithPayload<CoordsType, string>;
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
  appType,
}: PropsType) => {
  const windowTop = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, windowTop, topCoord, leftCoord);

  const dispatch = useDispatch();

  const handleSetActive = () => {
    dispatch(setWindowActive(appType));
  };

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
