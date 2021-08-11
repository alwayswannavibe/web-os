// Libraries
import { FC, ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

// Redux
import { setWindowActive, changeWindowPos } from 'src/redux/slices/appsSlice';

// I18n
import { useTranslation } from 'react-i18next';
import 'src/features/i18n';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';
import { useApp } from 'src/hooks/useApp';

// Styles
import { Resizable } from 're-resizable';
import styles from './style.module.css';

interface Props {
  type: Apps;
  children?: ReactNode;
}

export const Window: FC<Props> = ({ children, type }: Props) => {
  const isOpen = useSelector((state: RootState) => state.apps.appsState[type].isOpened);
  const isCollapsed = useSelector((state: RootState) => state.apps.appsState[type].isCollapsed);
  const windowCoords = useSelector((state: RootState) => state.apps.appsState[type].windowPos);

  const windowTop = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords } = useDragNDrop(changeWindowPos, windowTop, windowCoords, type);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAppIndex, handleClose, handleToggleCollapse } = useApp(type);

  const handleSetActive = () => {
    dispatch(setWindowActive(type));
  };

  const ref = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(() => {
    let width = window.innerHeight * 0.02 * 48;
    const localStorageWidth = localStorage.getItem(`window${type}Width`);
    if (localStorageWidth) {
      width = +(localStorageWidth) * 50;
    }
    return width;
  });

  const [windowHeight, setWindowHeight] = useState(() => {
    let width = window.innerHeight * 0.02 * 27;
    const localStorageHeight = localStorage.getItem(`window${type}Height`);
    if (localStorageHeight) {
      width = +(localStorageHeight) * 50;
    }
    return width;
  });

  const handleCloseWithProcessFullscreen = () => {
    if (document.fullscreenElement?.className.split('_')[1] === 'window') {
      document.exitFullscreen();
      setWindowWidth(window.innerHeight * 0.02 * 48);
      setWindowHeight(window.innerHeight * 0.02 * 27);
    }
    handleClose();
  };

  const handleToggleCollapseWithProcessFullscreen = () => {
    // if this window has fullscreen
    if (document.fullscreenElement?.className.split('_')[1] === 'window') {
      document.exitFullscreen();
      setWindowWidth(window.innerHeight * 0.02 * 48);
      setWindowHeight(window.innerHeight * 0.02 * 27);
    }
    handleToggleCollapse();
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      ref.current!.requestFullscreen();
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }, 500);
    } else if (document.fullscreenElement.className.split('_')[1] === 'window') {
      // if this window has fullscreen
      document.exitFullscreen();
      setWindowWidth(window.innerHeight * 0.02 * 48);
      setWindowHeight(window.innerHeight * 0.02 * 27);
    } else {
      // if document has fullscreen
      document.exitFullscreen();
      setTimeout(() => {
        ref.current!.requestFullscreen();
        setTimeout(() => {
          setWindowWidth(window.innerWidth);
          setWindowHeight(window.innerHeight);
        }, 500);
      }, 300);
    }
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
          ref={ref}
        >
          <Resizable
            size={{
              width: windowWidth || window.innerHeight * 0.02 * 48,
              height: windowHeight || window.innerHeight * 0.02 * 27,
            }}
            onResizeStop={(e, direction, _ref, d) => {
              const newWidth = windowWidth + d.width;
              const newHeight = windowHeight + d.height;
              setWindowWidth(newWidth);
              setWindowHeight(newHeight);
              localStorage.setItem(`window${type}Width`, (newWidth / 50).toString());
              localStorage.setItem(`window${type}Height`, (newHeight / 50).toString());
            }}
            minWidth={window.innerHeight * 0.02 * 36}
            bounds="window"
            lockAspectRatio
          >
            <div className={styles.windowTop} onMouseDown={startDrag} ref={windowTop}>
              <div onClick={handleSetActive} className={styles.title}>
                {t(`apps.${type}`)}
              </div>
              <div className={styles.buttonsContainer}>
                <button
                  type="button"
                  className={`${styles.collapseBtn} ${styles.btn}`}
                  onClick={handleToggleCollapseWithProcessFullscreen}
                >
                  <i className="fas fa-window-minimize" />
                </button>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="toggle fullscreen"
                  className={`${styles.collapseBtn} ${styles.btn}`}
                >
                  <i className={`fas fa-window-restore ${styles.fullscreenButton}`} />
                </button>
                <button
                  type="button"
                  className={`${styles.closeBtn} ${styles.btn}`}
                  onClick={handleCloseWithProcessFullscreen}
                >
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
