// Libraries
import { FC } from 'react';

// Styles
import styles from './loading.module.css';

interface Props {
  children?: never;
}

const Loading: FC<Props> = () => (
  <div className={styles.loadingRing}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export { Loading };
