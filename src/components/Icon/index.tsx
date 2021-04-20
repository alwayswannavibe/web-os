// React
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// import Types
import { Apps } from 'types/apps';
import { CoordsType } from 'types/coord';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  imgSource: string;
  // eslint-disable-next-line react/require-default-props
  children?: never;
  handleClick: () => void;
  title: Apps;
  topCoord: string;
  leftCoord: string;
  changeCoord: ActionCreatorWithPayload<CoordsType, string>;
};

export const Icon: FC<PropsType> = ({ imgSource, handleClick, title, topCoord, leftCoord, changeCoord }: PropsType) => {
  const [topCoordLocal, setTopCoordLocal] = useState(topCoord);
  const [leftCoordLocal, setLeftCoordLocal] = useState(leftCoord);
  const [shiftLeft, setShiftLeft] = useState(0);
  const [shiftTop, setShiftTop] = useState(0);
  const [iconIsDrag, setIconIsDrag] = useState(false);

  const dispatch = useDispatch();

  const icon = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const drag = useCallback(
    (event: MouseEvent) => {
      setTopCoordLocal(`${event.pageY - shiftTop}px`);
      setLeftCoordLocal(`${event.pageX - shiftLeft}px`);
    },
    [shiftLeft, shiftTop],
  );

  const stopDrag = useCallback(() => {
    icon.current!.style.cursor = 'pointer';
    dispatch(
      changeCoord({
        top: topCoordLocal,
        left: leftCoordLocal,
      }),
    );
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    setIconIsDrag(false);
  }, [changeCoord, dispatch, drag, leftCoordLocal, topCoordLocal]);

  const startDrag = (event: React.MouseEvent) => {
    event.preventDefault();
    setShiftLeft(event.clientX - icon.current!.getBoundingClientRect().x);
    setShiftTop(event.clientY - icon.current!.getBoundingClientRect().y);
    icon.current!.style.cursor = 'grabbing';
    setIconIsDrag(true);
  };

  useEffect(() => {
    if (!iconIsDrag) return;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [iconIsDrag, drag, stopDrag]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.container} style={{ top: topCoordLocal, left: leftCoordLocal }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleClick} className={styles.imgContainer} onMouseDown={startDrag} ref={icon}>
        <img src={imgSource} alt="" className={`${styles.img}`} ref={img} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
