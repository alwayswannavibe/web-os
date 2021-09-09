// Libraries
import { FC } from 'react';

// Styles
import styles from './error.module.css';

interface Props {
  children?: never;
  refetch: () => void;
}

const Error: FC<Props> = ({ refetch }: Props) => (
  <div className={styles.errorContainer}>
    Error, try again later
    <button type="button" onClick={refetch}>Refresh</button>
  </div>
);

export { Error };
