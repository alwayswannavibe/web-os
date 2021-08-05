// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { RootState } from 'src/redux/store';
import { updateStatus, restartGame } from 'src/redux/slices/appsSlicesBus/simonSlice';

// I18n
import 'src/i18n/i18next';

// Types
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';

// Styles
import styles from './simonBar.module.css';

interface Props {
  children?: never;
  difficulty: Difficulties;
}

export const SimonBar: FC<Props> = ({ difficulty }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const status = useSelector((store: RootState) => store.simon.simonStatus);
  const level = useSelector((store: RootState) => store.simon.level);

  const startGame = () => {
    dispatch(updateStatus({ status: SimonStatus.Showing }));
  };

  const handleRestartGame = () => {
    dispatch(restartGame());
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p>
          {t('simon.difficulty')}
          {': '}
          {t(`simon.difficulties.${difficulty}`)}
        </p>
        <p className={styles.level}>
          {t('simon.level')}
          {': '}
          {level}
        </p>
      </div>
      {status === SimonStatus.Waiting && (
        <button type="button" className={styles.startBtn} onClick={startGame}>{t('simon.start')}</button>
      )}
      {status === SimonStatus.Losed && (
        <button type="button" className={styles.startBtn} onClick={handleRestartGame}>{t('simon.restart')}</button>
      )}
    </div>
  );
};
