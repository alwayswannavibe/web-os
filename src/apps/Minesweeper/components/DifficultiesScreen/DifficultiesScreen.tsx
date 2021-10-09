// Libraries
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// I18n
import '@Features/i18n';

// Enums
import { Difficulty } from '@Enums/difficulty.enum';

// Redux
import { setMinesweeperDifficulty } from '@Minesweeper/redux/minesweeperSlice/minesweeperSlice';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Constants
import {
  EASY_MINES_COUNT,
  EASY_SIZE,
  EXTREME_MINES_COUNT,
  EXTREME_SIZE,
  HARD_MINES_COUNT,
  HARD_SIZE,
  NORMAL_MINES_COUNT,
  NORMAL_SIZE,
} from '@Minesweeper/constants/sizesAndMines';

// Styles
import styles from './difficultiesScreen.module.css';

const DifficultiesScreen: FC<ChildrenNever> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('minesweeper');

  const handleChoose = (difficulty: Difficulty) => {
    dispatch(setMinesweeperDifficulty({ difficulty }));
  };

  return (
    <div className={styles.difficulties}>
      <button type="button" onClick={() => handleChoose(Difficulty.Easy)}>
        <span>{t(`difficulties.${Difficulty.Easy}`)}</span>
        <span>{`${EASY_SIZE} X ${EASY_SIZE} (${EASY_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulty.Normal)}>
        <span>{t(`difficulties.${Difficulty.Normal}`)}</span>
        <span>{`${NORMAL_SIZE} X ${NORMAL_SIZE} (${NORMAL_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulty.Hard)}>
        <span>{t(`difficulties.${Difficulty.Hard}`)}</span>
        <span>{`${HARD_SIZE} X ${HARD_SIZE} (${HARD_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulty.Extreme)}>
        <span>{t(`difficulties.${Difficulty.Extreme}`)}</span>
        <span>{`${EXTREME_SIZE} X ${EXTREME_SIZE} (${EXTREME_MINES_COUNT} ${t('mines')})`}</span>
      </button>
    </div>
  );
};

export { DifficultiesScreen };