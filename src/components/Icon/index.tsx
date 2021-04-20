// React
import React, { FC } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  imgSource: string;
  // eslint-disable-next-line react/require-default-props
  children?: never;
  handleClick: () => void;
  title: string;
  topCoord: string;
  leftCoord: string;
};

export const Icon: FC<PropsType> = ({ imgSource, handleClick, title, topCoord, leftCoord }: PropsType) => (
  <div className={styles.container} style={{ top: topCoord, left: leftCoord }}>
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
    <div onClick={handleClick} className={styles.imgContainer}>
      <img src={imgSource} alt="" className={`${styles.img}`} />
    </div>
    <span className={styles.title}>{title}</span>
  </div>
);
