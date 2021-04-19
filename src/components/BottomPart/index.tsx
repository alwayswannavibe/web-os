// React
import React, { FC } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const BottomPart: FC<PropsType> = () => <div className={styles.container} />;
