// Libraries
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// I18n
import '@Features/i18n';

// Assets
import space from '@Backgrounds/space.webp';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Avatar } from '@Components/Avatar/Avatar';
import { Button } from '@Components/Button/Button';

// Styles
import styles from './welcome.module.css';

interface Props extends ChildrenNever {
  handleWelcomeClose: () => void;
}

const Welcome: FC<Props> = ({ handleWelcomeClose }: Props) => {
  const username = useSelector((state: RootState) => state.user.username);

  const { t } = useTranslation('welcome');
  const history = useHistory();

  function handleGoToLogin() {
    history.push('/login');
    sessionStorage.setItem('isWelcomeOpen', 'No');
  }

  return (
    <>
      <div className={styles.overlay} style={{ backgroundImage: `url(${space})` }} />
      <motion.main
        className={styles.main}
        exit={{ opacity: 0, y: '-50%' }}
        transition={{ duration: 1 }}
      >
        {username && (
          <>
            <Avatar name={username} width={128} height={128} />
            <p>
              {`${t('hello')}, ${username}`}
            </p>
            <Button type="button" className={styles.enter} onClick={handleWelcomeClose}>
              {t('enter')}
            </Button>
            <Button type="button" className={styles.changeAccount} onClick={handleGoToLogin}>
              {t('changeAccount')}
            </Button>
          </>
        ) || (
          <>
            <Button type="button" className={styles.enter} onClick={handleGoToLogin}>
              {t('login')}
            </Button>
            <p>
              {t('or')}
            </p>
            <Button type="button" className={styles.enter} onClick={handleWelcomeClose}>
              {t('continueAsAGuest')}
            </Button>
          </>
        )}
      </motion.main>
    </>
  );
};

export { Welcome };
