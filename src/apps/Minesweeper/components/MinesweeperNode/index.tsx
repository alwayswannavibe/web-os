import { FC, useEffect, useState } from 'react';
import { BOMB_NUMBER } from 'src/apps/Minesweeper/constants/bombNumber';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import classNames from 'classnames';
import { addFlag, removeFlag, setVisible } from 'src/apps/Minesweeper/redux';
import styles from './minesweeperNode.module.css';

interface Props {
  children?: never;
  value: number;
  arrIndex: number;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MinesweeperNode: FC<Props> = ({ value, arrIndex, index }: Props) => {
  const [isFlag, setIsFlag] = useState(false);
  const [isBombClick, setIsBombClick] = useState(false);
  const isVisble = useSelector((state: RootState) => state.minesweeper.visibilityList[arrIndex][index]);
  const isLose = useSelector((state: RootState) => state.minesweeper.isLose);
  const isWin = useSelector((state: RootState) => state.minesweeper.isWin);
  const isFlagAvailable = useSelector((state: RootState) => state.minesweeper.isFlagAvailable);
  const dispatch = useDispatch();

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isVisble || isLose || isWin) {
      return;
    }

    if (!isFlag && !isFlagAvailable) {
      return;
    }

    if (isFlag) {
      dispatch(removeFlag());
    } else {
      dispatch(addFlag());
    }

    setIsFlag(!isFlag);
  };

  const handleClick = () => {
    if (isFlag || isLose || isWin) {
      return;
    }

    if (value === BOMB_NUMBER) {
      dispatch(setVisible({ arrIndex, index }));
      setIsBombClick(true);
    } else {
      dispatch(setVisible({ arrIndex, index }));
    }
  };

  useEffect(() => {
    if (!isLose && !isWin) {
      setIsBombClick(false);
      setIsFlag(false);
    }
  }, [isLose, isWin]);

  return (
    <button
      type="button"
      className={classNames(styles.node, {
        [styles.lose]: value === BOMB_NUMBER && isLose,
        [styles.win]: value === BOMB_NUMBER && isWin,
        [styles[`bombAround${value}`]]: isVisble,
      })}
      onContextMenu={handleRightClick}
      onClick={handleClick}
    >
      {isFlag && !isVisble && (<i className={`fa fa-flag ${styles.flag}`} aria-hidden="true" />)}
      {isVisble && value !== 0 && !isBombClick && (value === BOMB_NUMBER ? <i className="fa fa-bomb" /> : value)}
      {isBombClick && <i className="fa fa-bahai" />}
    </button>
  );
};

export { MinesweeperNode };
