// React, redux
import { FC } from 'react';

// Components
import { FullscreenButton } from 'src/components/FullscreenButton';
import { Username } from 'src/components/Username';
import { TopDate } from 'src/components/TopDate';

// Styles
import styles from './style.module.css';

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
