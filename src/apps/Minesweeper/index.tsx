// Libraries
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';
import { Difficulties } from 'src/types/difficulties';

// Assets
import imgSource from 'src/assets/images/icons/minesweeper.svg';

// Redux
import { calculateMinesweeper, generateMinesweeperPattern } from 'src/apps/Minesweeper/redux';

// Components
import { Icon } from 'src/components/Icon';
import { Window } from 'src/components/Window';
import { DifficultiesScreen } from './components/DifficultiesScreen';
import { MinesweeperNode } from './components/MinesweeperNode';
import { Sidebar } from './components/Sidebar';

// Styles
import styles from './minesweeper.module.css';

interface Props {
  children?: never;
}

const Minesweeper: FC<Props> = () => {
  const pattern = useSelector((state: RootState) => state.minesweeper.pattern);
  const size = useSelector((state: RootState) => state.minesweeper.size);
  const difficulty = useSelector((state: RootState) => state.minesweeper.difficulty);
  const isOpen = useSelector((state: RootState) => state.apps.appsState[Apps.Minesweeper].isOpened);
  const isCollapsed = useSelector((state: RootState) => state.apps.appsState[Apps.Minesweeper].isCollapsed);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (difficulty === Difficulties.None) {
      return;
    }
    dispatch(generateMinesweeperPattern());
    dispatch(calculateMinesweeper());
  }, [dispatch, difficulty]);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      mainContentRef.current.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    }
  }, [size, isOpen, isCollapsed]);

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.Minesweeper} />
      <Window type={Apps.Minesweeper}>
        {difficulty === Difficulties.None ? (
          <DifficultiesScreen />
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.main} ref={mainContentRef}>
              {pattern.length && pattern.map((arr, arrIndex) => arr.map((el, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <MinesweeperNode value={el} arrIndex={arrIndex} index={i} key={`${arrIndex}-${i}`} />
              )))}
            </div>
            <Sidebar />
          </div>
        )}
      </Window>
    </>
  );
};

export { Minesweeper };
