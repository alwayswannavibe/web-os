// React, redux
import { FC, ReactNode, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setWindowActive } from 'src/redux/slices/appsSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';

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
  const { t } = useTranslation();

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
          <div className={styles.windowTop} onMouseDown={startDrag} ref={windowTop}>
            <div onClick={handleSetActive} className={styles.title}>
              {t(`apps.${title}`)}
            </div>
            <div className={styles.buttonsContainer}>
              <button type="button" className={`${styles.collapseBtn} ${styles.btn}`} onClick={handleCollapse}>
                <i className="fas fa-window-minimize" />
              </button>
              <button type="button" className={`${styles.closeBtn} ${styles.btn}`} onClick={handleClose}>
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className={styles.windowBody} onClick={handleSetActive}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
