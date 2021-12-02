// Libraries
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './authAppRedirect.module.css';

const AuthAppRedirect: FC<ChildrenNever> = () => {
  const history = useHistory();

  const { t } = useTranslation('authRedirect');

  function handleClick() {
    history.push('/login');
  }

  return (
    <div className={styles.container}>
      <p className={styles.text}>{t('authRedirect.pleaseLogin')}</p>
      <Button onClick={handleClick}>{t('authRedirect.goToLogin')}</Button>
    </div>
  );
};

export { AuthAppRedirect };
