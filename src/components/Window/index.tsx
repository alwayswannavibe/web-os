// React, redux
import { FC, ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowActive } from 'src/redux/slices/appsSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';
import { RootState } from 'src/redux/store';

// I18n
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';

// Types
import { Apps } from 'src/types/apps';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';
import { useApp } from 'src/hooks/useApp';

// Styles
import { Resizable } from 're-resizable';
import styles from './style.module.css';

type PropsType = {
  type: Apps;
  children?: ReactNode;
};

export const Window: FC<PropsType> = ({ children, type }: PropsType) => {
  const isOpen = useSelector((state: RootState) => state.appsState.apps[type].isOpened);
  const isCollapsed = useSelector((state: RootState) => state.appsState.apps[type].isCollapsed);
  const windowCoords = useSelector((state: RootState) => state.appsState.apps[type].windowPos);

  const windowTop = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords } = useDragNDrop(changeWindowPos, windowTop, windowCoords, type);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAppIndex, handleClose, handleToggleCollapse } = useApp(type);

  const handleSetActive = () => {
    dispatch(setWindowActive(type));
  };

  return (
    <AnimatePresence>
      {isOpen && !isCollapsed && (
        <motion.div
          className={styles.window}
          style={{ top: newCoords?.top, left: newCoords?.left, zIndex: 100 - getAppIndex() }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 0.3,
          }}
          data-cy={`window-${type}`}
        >
          <Resizable
            defaultSize={{
              width: window.innerHeight * 0.02 * 48,
              height: window.innerHeight * 0.02 * 30,
            }}
            minHeight={window.innerHeight * 0.02 * 24}
            minWidth={window.innerHeight * 0.02 * 36}
            bounds="window"
            lockAspectRatio
          >
            <div className={styles.windowTop} onMouseDown={startDrag} ref={windowTop}>
              <div onClick={handleSetActive} className={styles.title}>
                {t(`apps.${type}`)}
              </div>
              <div className={styles.buttonsContainer}>
                <button type="button" className={`${styles.collapseBtn} ${styles.btn}`} onClick={handleToggleCollapse}>
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
          </Resizable>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
