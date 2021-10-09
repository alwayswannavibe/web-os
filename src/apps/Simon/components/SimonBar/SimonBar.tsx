// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { updateStatus, restartGame } from '@Simon/redux/simonSlice/simonSlice';

// I18n
import 'src/features/i18n';

// Enums
import { Difficulty } from '@Enums/difficulty.enum';
import { SimonStatus } from '@Simon/enums/simonStatus.enum';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Types
import { RootState } from '@Types/rootState.type';

// Styles
import styles from './simonBar.module.css';

interface Props extends ChildrenNever {
  difficulty: Difficulty;
}

export const SimonBar: FC<Props> = ({ difficulty }: Props) => {
  const status = useSelector((store: RootState) => store.simon.simonStatus);
  const level = useSelector((store: RootState) => store.simon.level);

  const dispatch = useDispatch();
  const { t } = useTranslation('simon');

  function startGame(): void {
    dispatch(updateStatus({ status: SimonStatus.Showing }));
  }

  function handleRestartGame(): void {
    dispatch(restartGame());
  }

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
