// Libraries
import React, { FC, ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Resizable } from 're-resizable';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowRestore, faTimes, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

// Redux
import { setWindowActive, setWindowPosition } from 'src/redux/slices/appsSlice/appsSlice';

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
  const isOpen = useSelector((state: RootState) => state.apps.appsState[type].isOpen);
  const isCollapsed = useSelector((state: RootState) => state.apps.appsState[type].isCollapsed);
  const windowPosition = useSelector((state: RootState) => state.apps.appsState[type].windowPosition);
  const windowWidth = useSelector((state: RootState) => state.apps.appsState[type].windowSize.width);
  const windowHeight = useSelector((state: RootState) => state.apps.appsState[type].windowSize.height);
  console.log(windowWidth);

  const windowTop = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords, isDrag } = useDragNDrop(setWindowPosition, windowTop, windowPosition, type);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAppIndex, handleClose, handleToggleCollapse, handleResize } = useApp(type);

  function handleSetActive() {
    dispatch(setWindowActive(type));
  }

  function returnToDefaultSize() {
    handleResize(getPxFromRem(48), getPxFromRem(27));
  }

  function windowToFullscreenSize() {
    handleResize(window.innerWidth, window.innerHeight);
  }

  function isDocumentFullscreen(): boolean {
    return document.fullscreenElement?.className.split('_')[1] === 'window';
  }

  async function handleCloseWithProcessFullscreen() {
    if (isDocumentFullscreen()) {
      await document.exitFullscreen();
      returnToDefaultSize();
    }
    handleClose();
  }

  async function handleToggleCollapseWithProcessFullscreen() {
    if (isDocumentFullscreen()) {
      await document.exitFullscreen();
      returnToDefaultSize();
    }
    handleToggleCollapse();
  }

  async function handleFullscreen() {
    if (!document.fullscreenElement) {
      await ref.current!.requestFullscreen();
      windowToFullscreenSize();
    } else if (isDocumentFullscreen()) {
      await document.exitFullscreen();
      returnToDefaultSize();
    } else {
      await document.exitFullscreen();
      await ref.current!.requestFullscreen();
      handleResize(window.innerWidth, window.innerHeight);
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
              width: getPxFromRem(+(windowWidth.split('rem')[0])),
              height: getPxFromRem(+(windowHeight.split('rem')[0])),
            }}
            onResizeStop={(e, direction, _ref, d) => {
              const newWidth = getPxFromRem(+windowWidth.split('rem')[0]) + d.width;
              const newHeight = getPxFromRem(+windowHeight.split('rem')[0]) + d.height;
              handleResize(newWidth, newHeight);
            }}
            minWidth={getPxFromRem(48)}
            bounds="window"
            lockAspectRatio
          >
            <div
              className={`
                ${styles.windowTop}
                ${getAppIndex() === 0 ? '' : styles.notActiveWindow}
                ${isDrag ? styles.grabbed : ''}
              `}
              onMouseDown={startDrag}
              ref={windowTop}
              tabIndex={0}
              role="button"
              aria-grabbed={isDrag}
            >
              <div onClick={handleSetActive} className={styles.title} role="button" tabIndex={0}>
                {t(`apps.${type}`)}
              </div>
              <div className={styles.buttonsContainer}>
                <Button
                  className={`${styles.collapseBtn} ${styles.btn}`}
                  onClick={handleToggleCollapseWithProcessFullscreen}
                  aria-label="minimize window"
                >
                  <FontAwesomeIcon icon={faWindowMinimize} />
                </Button>
                <Button
                  onClick={handleFullscreen}
                  aria-label="toggle fullscreen"
                  className={`${styles.collapseBtn} ${styles.btn}`}
                >
                  <FontAwesomeIcon icon={faWindowRestore} />
                </Button>
                <Button
                  className={`${styles.closeBtn} ${styles.btn}`}
                  onClick={handleCloseWithProcessFullscreen}
                  aria-label="close window"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            </div>
            <div className={styles.windowBody} onClick={handleSetActive} role="button" tabIndex={0}>
              {children}
            </div>
          </Resizable>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
