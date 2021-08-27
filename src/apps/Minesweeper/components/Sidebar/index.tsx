import { FC } from 'react';
import { calculateMinesweeper, generateMinesweeperPattern, setMinesweeperDifficulty } from 'src/apps/Minesweeper/redux';
import { Difficulties } from 'src/types/difficulties';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/redux/store';

// I18n
import 'src/features/i18n';

// Styles
import styles from './sidebar.module.css';

interface Props {
  children?: never;
}

const Sidebar: FC<Props> = () => {
  const availableFlags = useSelector((state: RootState) => state.minesweeper.availableFlags);
  const isLose = useSelector((state: RootState) => state.minesweeper.isLose);
  const isWin = useSelector((state: RootState) => state.minesweeper.isWin);

  const dispatch = useDispatch();
  const { t } = useTranslation('minesweeper');

  const handleRestart = () => {
    dispatch(generateMinesweeperPattern());
    dispatch(calculateMinesweeper());
  };

  const handleChangeDifficulty = () => {
    dispatch(setMinesweeperDifficulty({ difficulty: Difficulties.None }));
  };

  return (
    <div className={styles.sidebar}>
      <p>
        {`${t('Available')} `}
        <i className="fa fa-flag" />
        {`: ${availableFlags}`}
      </p>
      {isLose && <p>{t('You lose!')}</p>}
      {isWin && <p>{t('You win!')}</p>}
      {(isLose || isWin) && (
        <div className={styles.failButtons}>
          <button
            type="button"
            onClick={handleChangeDifficulty}
          >
            {t('Change difficulty')}
          </button>
          <button
            type="button"
            onClick={handleRestart}
          >
            {t('Restart')}
          </button>
        </div>
      )}
    </div>
  );
};

export { Sidebar };
