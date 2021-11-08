// Libraries
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './authAppRedirect.module.css';

const AuthAppRedirect: FC<ChildrenNever> = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>Please log in to view this app</p>
      <Button type="button" onClick={handleClick}>Go to login page</Button>
    </div>
  );
};

export { AuthAppRedirect };
