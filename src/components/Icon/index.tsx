// React, Redux
import React, { FC, useRef } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

// Hooks
import { useDragNDrop } from 'hooks/useDragNDrop';

// Types
import { Apps } from 'types/apps';
import { CoordsType } from 'types/coord';

// Styles
import styles from './style.module.css';

type PropsType = {
  imgSource: string;
  handleClick: () => void;
  title: Apps;
  topCoord: string;
  leftCoord: string;
  changeCoord: ActionCreatorWithPayload<CoordsType, string>;
  children?: never;
};

export const Icon: FC<PropsType> = ({ imgSource, handleClick, title, topCoord, leftCoord, changeCoord }: PropsType) => {
  const icon = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, icon, topCoord, leftCoord);

  return (
    <div className={styles.container} style={{ top: topCoordLocal, left: leftCoordLocal }} ref={icon}>
      <div onDoubleClick={handleClick} className={styles.imgContainer} onMouseDown={startDrag}>
        <img src={imgSource} alt="" className={`${styles.img}`} />
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
