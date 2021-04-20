// React
import React, { FC, ReactNode } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  title: string;
  handleClose: () => void;
  handleCollapse: () => void;
  topCoord: string;
  leftCoord: string;
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
}: PropsType) => (
  <div className={styles.window} style={{ top: topCoord, left: leftCoord }}>
    <div className={styles.windowTop}>
      <span className={styles.title}>{title}</span>
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
    <div className={styles.windowBody}>{children}</div>
  </div>
);
