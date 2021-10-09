// Libraries
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './authAppRedirect.module.css';

const AuthAppRedirect: FC<ChildrenNever> = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <p>Please log in to view this app</p>
      <button type="button" onClick={handleClick} className={styles.button}>Go to login page</button>
    </div>
  );
};

export { AuthAppRedirect };
