// React, redux
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

const Username: FC<PropsType> = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const loading = useSelector((state: RootState) => state.user.loading);

  return <div className={styles.username}>{loading ? <p>Loading...</p> : <p>{username || 'Anonymous'}</p>}</div>;
};

export { Username };
