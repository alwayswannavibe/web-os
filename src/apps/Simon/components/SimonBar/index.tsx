// React, redux
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { updateStatus, restartGame } from 'src/redux/slices/appsSlicesBus/simonSlice';

// Types
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';

// Styles
import styles from './simonBar.module.css';

type PropsType = {
  children?: never;
  difficulty: Difficulties;
};

export const SimonBar: FC<PropsType> = ({ difficulty }: PropsType) => {
  const dispatch = useDispatch();

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
      <p>
        Difficulty:
        {difficulty}
      </p>
      <p className={styles.level}>
        Level:
        {level}
      </p>
      {status === SimonStatus.Waiting && (
        <button type="button" className={styles.startBtn} onClick={startGame}>Start</button>
      )}
      {status === SimonStatus.Losed && (
        <button type="button" className={styles.startBtn} onClick={handleRestartGame}>Restart</button>
      )}
    </div>
  );
};
