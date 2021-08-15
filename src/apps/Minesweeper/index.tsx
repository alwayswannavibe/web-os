import { FC, useEffect, useRef } from 'react';
import { Icon } from 'src/components/Icon';
import { Apps } from 'src/types/apps';
import imgSource from 'src/assets/images/icons/minesweeper.svg';
import { Window } from 'src/components/Window';
import { useDispatch, useSelector } from 'react-redux';
import { MinesweeperNode } from './components/MinesweeperNode';
import styles from './minesweeper.module.css';
import { calculateMinesweeper, generateMinesweeperPattern } from './redux';
import { RootState } from '../../redux/store';

interface Props {
  children?: never;
}

const Minesweeper: FC<Props> = () => {
  const pattern = useSelector((state: RootState) => state.minesweeper.pattern);
  const availableFlags = useSelector((state: RootState) => state.minesweeper.availableFlags);
  const isLose = useSelector((state: RootState) => state.minesweeper.isLose);
  const isWin = useSelector((state: RootState) => state.minesweeper.isWin);
  const size = useSelector((state: RootState) => state.minesweeper.size);

  const dispatch = useDispatch();

  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(generateMinesweeperPattern());
    dispatch(calculateMinesweeper());
  }, [dispatch]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      mainContentRef.current.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    }
  }, [size]);

  const handleRestart = () => {
    dispatch(generateMinesweeperPattern());
    dispatch(calculateMinesweeper());
  };

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.Minesweeper} />
      <Window type={Apps.Minesweeper}>
        <div className={styles.wrapper}>
          <div className={styles.main} ref={mainContentRef}>
            {pattern.length && pattern.map((arr, arrIndex) => arr.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MinesweeperNode value={el} arrIndex={arrIndex} index={i} key={`${arrIndex}-${i}`} />
            )))}
          </div>
          <div className={styles.sidebar}>
            <p>
              {'Available '}
              <i className="fa fa-flag" />
              {`: ${availableFlags}`}
            </p>
            {isLose && <p>You lose!</p>}
            {isWin && <p>You win!</p>}
            {(isLose || isWin) && (
              <button
                type="button"
                className={styles.restart}
                onClick={handleRestart}
              >
                Restart
              </button>
            )}
          </div>
        </div>
      </Window>
    </>
  );
};

export { Minesweeper };
