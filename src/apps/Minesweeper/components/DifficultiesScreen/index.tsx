// Libraries
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// I18n
import 'src/features/i18n';

// Types
import { Difficulties } from 'src/types/difficulties';

// Redux
import { setMinesweeperDifficulty } from 'src/apps/Minesweeper/redux';

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
} from 'src/apps/Minesweeper/constants/sizesAndMines';

// Styles
import styles from './difficultiesScreen.module.css';

interface Props {
  children?: never;
}

const DifficultiesScreen: FC<Props> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('minesweeper');

  const handleChoose = (difficulty: Difficulties) => {
    dispatch(setMinesweeperDifficulty({ difficulty }));
  };

  return (
    <div className={styles.difficulties}>
      <button type="button" onClick={() => handleChoose(Difficulties.Easy)}>
        <span>{t(`difficulties.${Difficulties.Easy}`)}</span>
        <span>{`${EASY_SIZE} X ${EASY_SIZE} (${EASY_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Normal)}>
        <span>{t(`difficulties.${Difficulties.Normal}`)}</span>
        <span>{`${NORMAL_SIZE} X ${NORMAL_SIZE} (${NORMAL_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Hard)}>
        <span>{t(`difficulties.${Difficulties.Hard}`)}</span>
        <span>{`${HARD_SIZE} X ${HARD_SIZE} (${HARD_MINES_COUNT} ${t('mines')})`}</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Extreme)}>
        <span>{t(`difficulties.${Difficulties.Extreme}`)}</span>
        <span>{`${EXTREME_SIZE} X ${EXTREME_SIZE} (${EXTREME_MINES_COUNT} ${t('mines')})`}</span>
      </button>
    </div>
  );
};

export { DifficultiesScreen };
