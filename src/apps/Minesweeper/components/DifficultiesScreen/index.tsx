import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Difficulties } from 'src/types/difficulties';
import { setMinesweeperDifficulty } from 'src/apps/Minesweeper/redux';
import styles from './difficultiesScreen.module.css';

interface Props {
  children?: never;
}

const DifficultiesScreen: FC<Props> = () => {
  const dispatch = useDispatch();

  const handleChoose = (difficulty: Difficulties) => {
    dispatch(setMinesweeperDifficulty({ difficulty }));
  };

  return (
    <div className={styles.difficulties}>
      <button type="button" onClick={() => handleChoose(Difficulties.Easy)}>
        <span>{Difficulties.Easy}</span>
        <span>7 x 7 (10 mines)</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Normal)}>
        <span>{Difficulties.Normal}</span>
        <span>12 x 12 (25 mines)</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Hard)}>
        <span>{Difficulties.Hard}</span>
        <span>15 x 15 (45 mines)</span>
      </button>
      <button type="button" onClick={() => handleChoose(Difficulties.Extreme)}>
        <span>{Difficulties.Extreme}</span>
        <span>20 x 20 (75 mines)</span>
      </button>
    </div>
  );
};

export { DifficultiesScreen };
