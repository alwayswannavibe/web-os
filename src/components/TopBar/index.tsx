// Libraries
import { FC } from 'react';

// Components
import { FullscreenButton } from 'src/components/FullscreenButton';
import { Username } from 'src/components/Username';
import { TopDate } from 'src/components/TopDate';

// Styles
import styles from './style.module.css';

interface Props {
  children?: never;
}

export const TopBar: FC<Props> = () => (
  <div className={styles.container} id="top-bar">
    <TopDate />
    <Username />
    <FullscreenButton />
  </div>
);
