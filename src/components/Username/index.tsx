// Libraries
import { FC } from 'react';
import { useSelector } from 'react-redux';

// Types
import { RootState } from 'src/redux/store';

// Styles
import styles from './style.module.css';

interface Props {
  children?: never;
}

const Username: FC<Props> = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const loading = useSelector((state: RootState) => state.user.loading);

  return <div className={styles.username}>{loading ? <p>Loading...</p> : <p>{username || 'Anonymous'}</p>}</div>;
};

export { Username };
