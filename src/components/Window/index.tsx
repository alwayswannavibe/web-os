// React, redux
import { FC, ReactNode, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setWindowActive } from 'src/redux/slices/appsSlice';
import { AnimatePresence, motion } from 'framer-motion';

// Types
import { CoordsType } from 'src/types/coord';
import { Apps } from 'src/types/apps';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';

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
  isOpen: boolean;
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
  isOpen,
}: PropsType) => {
  const windowTop = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, windowTop, topCoord, leftCoord);

  const dispatch = useDispatch();

  const handleSetActive = () => {
    dispatch(setWindowActive(appType));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.window}
          style={{ top: topCoordLocal, left: leftCoordLocal, zIndex: zIndexProp }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 0.3,
          }}
          data-cy={`window-${title}`}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
