// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { changeDifficulty, restartGame, updateStatus } from '@Simon/redux/simonSlice/simonSlice';

// I18n
import 'src/features/i18n';

// Enums
import { Difficulty } from '@Enums/difficulty.enum';
import { SimonStatus } from '@Simon/enums/simonStatus.enum';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Types
import { RootState } from '@Types/rootState.type';

// Styles
import styles from './simonBar.module.css';

interface Props extends ChildrenNever {
  difficulty: Difficulty;
}

export const SimonBar: FC<Props> = React.memo(({ difficulty }: Props) => {
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

  function handleChangeDifficulty(): void {
    dispatch(changeDifficulty({ difficulty: Difficulty.None }));
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
        <Button onClick={startGame} className={styles.btn}>{t('simon.start')}</Button>
      )}
      {status === SimonStatus.Losed && (
        <div className={styles.buttons}>
          <Button onClick={handleChangeDifficulty} className={styles.btn}>{t('simon.changeDifficulty')}</Button>
          <Button onClick={handleRestartGame} className={styles.btn}>{t('simon.restart')}</Button>
        </div>
      )}
    </div>
  );
});
