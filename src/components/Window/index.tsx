// React
import React, { FC, ReactNode, useEffect, useRef, useState, useCallback } from 'react';

// types import
import { CoordsType } from 'types/coord';

// Redux
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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
  const [topCoordLocal, setTopCoordLocal] = useState(topCoord);
  const [leftCoordLocal, setLeftCoordLocal] = useState(leftCoord);
  const [shiftLeft, setShiftLeft] = useState(0);
  const [shiftTop, setShiftTop] = useState(0);
  const [windowIsDrag, setWindowIsDrag] = useState(false);

  const dispatch = useDispatch();

  const windowTop = useRef<HTMLDivElement>(null);

  const drag = useCallback(
    (event: MouseEvent) => {
      setTopCoordLocal(`${event.pageY - shiftTop}px`);
      setLeftCoordLocal(`${event.pageX - shiftLeft}px`);
    },
    [shiftLeft, shiftTop],
  );

  const stopDrag = useCallback(() => {
    windowTop.current!.style.cursor = 'pointer';
    dispatch(
      changeCoord({
        top: topCoordLocal,
        left: leftCoordLocal,
      }),
    );
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    setWindowIsDrag(false);
  }, [changeCoord, dispatch, drag, leftCoordLocal, topCoordLocal]);

  const startDrag = (event: React.MouseEvent) => {
    setShiftLeft(event.clientX - windowTop.current!.getBoundingClientRect().x);
    setShiftTop(event.clientY - windowTop.current!.getBoundingClientRect().y);
    windowTop.current!.style.cursor = 'grabbing';
    setWindowIsDrag(true);
  };

  useEffect(() => {
    if (!windowIsDrag) return;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [windowIsDrag, drag, stopDrag]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={styles.window}
      style={{ top: topCoordLocal, left: leftCoordLocal, zIndex: zIndexProp }}
      onClick={handleSetActive}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className={styles.windowTop} onMouseDown={startDrag} ref={windowTop}>
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
};
