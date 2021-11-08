// Libraries
import React, { FC, ReactNode, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Resizable } from 're-resizable';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowRestore, faTimes, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

// Redux
import { setWindowActive, changeWindowPos } from 'src/redux/slices/appsSlice/appsSlice';

// I18n
import '@Features/i18n';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Hooks
import { useDragNDrop } from '@Hooks/useDragNDrop/useDragNDrop';
import { useApp } from '@Hooks/useApp/useApp';

// Components
import { Button } from '@Components/Button/Button';

// Utils
import { getPxFromRem } from '@Utils/getPxFromRem';

// Styles
import styles from './window.module.css';

interface Props {
  children?: ReactNode;
  type: App;
}

export const Window: FC<Props> = ({ children, type }: Props) => {
  const isOpen = useSelector((state: RootState) => state.apps.appsState[type].isOpened);
  const isCollapsed = useSelector((state: RootState) => state.apps.appsState[type].isCollapsed);
  const windowCoords = useSelector((state: RootState) => state.apps.appsState[type].windowPos);

  const windowTop = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords } = useDragNDrop(changeWindowPos, windowTop, windowCoords, type);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAppIndex, handleClose, handleToggleCollapse } = useApp(type);

  const [windowWidth, setWindowWidth] = useState(() => {
    let width = getPxFromRem(48);
    const localStorageWidth = localStorage.getItem(`window${type}Width`);
    if (localStorageWidth) {
      width = +(localStorageWidth) * 50;
    }
    return width;
  });

  const [windowHeight, setWindowHeight] = useState(() => {
    let height = getPxFromRem(27);
    const localStorageHeight = localStorage.getItem(`window${type}Height`);
    if (localStorageHeight) {
      height = +(localStorageHeight) * 50;
    }
    return height;
  });

  function handleSetActive(): void {
    dispatch(setWindowActive(type));
  }

  function returnToDefaultSize(): void {
    setTimeout(() => {
      setWindowWidth(getPxFromRem(48));
      setWindowHeight(getPxFromRem(27));
    }, 500);
  }

  function windowToFullscreenSize(): void {
    setTimeout(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, 500);
  }

  function isDocumentFullscreen(): boolean {
    return document.fullscreenElement?.className.split('_')[1] === 'window';
  }

  function handleCloseWithProcessFullscreen(): void {
    if (isDocumentFullscreen()) {
      document.exitFullscreen();
      returnToDefaultSize();
    }
    handleClose();
  }

  function handleToggleCollapseWithProcessFullscreen(): void {
    if (isDocumentFullscreen()) {
      document.exitFullscreen();
      returnToDefaultSize();
    }
    handleToggleCollapse();
  }

  function handleFullscreen(): void {
    if (!document.fullscreenElement) {
      ref.current!.requestFullscreen();
      windowToFullscreenSize();
    } else if (isDocumentFullscreen()) {
      document.exitFullscreen();
      returnToDefaultSize();
    } else {
      document.exitFullscreen();
      setTimeout(() => {
        ref.current!.requestFullscreen();
        windowToFullscreenSize();
      }, 300);
    }
  }

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
            duration: 0.2,
          }}
          data-cy={`window-${type}`}
          ref={ref}
        >
          <Resizable
            size={{
              width: windowWidth || getPxFromRem(48),
              height: windowHeight || getPxFromRem(27),
            }}
            onResizeStop={(e, direction, _ref, d) => {
              const newWidth = windowWidth + d.width;
              const newHeight = windowHeight + d.height;
              setWindowWidth(newWidth);
              setWindowHeight(newHeight);
              localStorage.setItem(`window${type}Width`, (newWidth / 50).toString());
              localStorage.setItem(`window${type}Height`, (newHeight / 50).toString());
            }}
            minWidth={getPxFromRem(48)}
            bounds="window"
            lockAspectRatio
          >
            <div className={`${styles.windowTop} ${getAppIndex() === 0 ? '' : styles.notActiveWindow}`} onMouseDown={startDrag} ref={windowTop}>
              <div onClick={handleSetActive} className={styles.title}>
                {t(`apps.${type}`)}
              </div>
              <div className={styles.buttonsContainer}>
                <Button
                  type="button"
                  className={`${styles.collapseBtn} ${styles.btn}`}
                  onClick={handleToggleCollapseWithProcessFullscreen}
                  aria-label="minimize window"
                >
                  <FontAwesomeIcon icon={faWindowMinimize} />
                </Button>
                <Button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="toggle fullscreen"
                  className={`${styles.collapseBtn} ${styles.btn}`}
                >
                  <FontAwesomeIcon icon={faWindowRestore} />
                </Button>
                <Button
                  type="button"
                  className={`${styles.closeBtn} ${styles.btn}`}
                  onClick={handleCloseWithProcessFullscreen}
                  aria-label="close window"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
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
