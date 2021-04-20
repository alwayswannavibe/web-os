// React
import React, { FC } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  title: string;
  handleClick: () => void;
  // eslint-disable-next-line react/require-default-props
  children?: never;
};

export const BottomTab: FC<PropsType> = ({ title, handleClick }: PropsType) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div className={`${styles.tab}`} onClick={handleClick}>
    {title}
  </div>
);
