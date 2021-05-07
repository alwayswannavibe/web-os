// React
import React, { FC } from 'react';

// Components
import { FullscreenButton } from 'components/FullscreenButton';
import { Username } from 'components/Username';
import { TopDate } from 'components/TopDate';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const TopBar: FC<PropsType> = () => (
  <div className={styles.container} id="top-bar">
    <TopDate />
    <Username />
    <FullscreenButton />
  </div>
);
