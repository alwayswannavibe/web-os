// React, redux
import { FC, useEffect, useRef } from 'react';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { simonClick, startShowing, updateStatus } from 'src/redux/slices/appsSlicesBus/simonSlice';

// Types
import { SimonStatus } from 'src/types/simonStatus';
import { Apps } from 'src/types/apps';

// Assets
import sound1 from 'src/assets/sounds/simon/simon1.wav';
import sound2 from 'src/assets/sounds/simon/simon2.wav';
import sound3 from 'src/assets/sounds/simon/simon3.wav';
import sound4 from 'src/assets/sounds/simon/simon4.wav';

// Components
import { SimonBar } from 'src/apps/Simon/components/SimonBar/index';

// Styles
import styles from './simonFour.module.css';

type PropsType = {
  children?: never;
};

export const SimonFour: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const status = useSelector((store: RootState) => store.simon.simonStatus);
  const pattern = useSelector((store: RootState) => store.simon.pattern);
  const level = useSelector((store: RootState) => store.simon.level);
  const isSimonOpen = useSelector((store: RootState) => store.appsState.apps[Apps.Simon].isOpened);
  const difficulty = useSelector((store: RootState) => store.simon.difficulty);

  const btn1 = useRef<HTMLButtonElement>(null);
  const btn2 = useRef<HTMLButtonElement>(null);
  const btn3 = useRef<HTMLButtonElement>(null);
  const btn4 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === SimonStatus.Showing) {
      if (pattern.length !== 3 + (level - 1)) {
        dispatch(startShowing());
      } else {
        const buttons = [btn1, btn2, btn3, btn4];
        const sounds = [sound1, sound2, sound3, sound4];
        pattern.forEach((el, index) => {
          setTimeout(() => {
            new Audio(sounds[el]).play();
          }, 900 * index + 900);
          setTimeout(() => buttons[el]?.current?.classList!.add(styles.btnActive), 900 * index + 900);
          setTimeout(() => buttons[el]?.current?.classList!.remove(styles.btnActive), 900 * index + 1400);
        });
        setTimeout(() => {
          dispatch(updateStatus({ status: SimonStatus.Playing }));
        }, 900 * pattern.length + 400);
      }
    }
  }, [dispatch, isSimonOpen, pattern, level, status]);

  const handleClick = (numberOfButton: number) => {
    const buttons = [btn1, btn2, btn3, btn4];
    const sounds = [sound1, sound2, sound3, sound4];
    new Audio(sounds[numberOfButton]).play();
    setTimeout(() => buttons[numberOfButton]?.current?.classList.add(styles.btnActive), 0);
    setTimeout(() => buttons[numberOfButton]?.current?.classList.remove(styles.btnActive), 400);
    setTimeout(() => dispatch(simonClick({ numberOfButton })), 400);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.btnRed}
          disabled={status !== SimonStatus.Playing}
          ref={btn1}
          onClick={() => handleClick(0)}
          aria-label="simon-button-red"
        />
        <button
          type="button"
          className={styles.btnGreen}
          disabled={status !== SimonStatus.Playing}
          ref={btn2}
          onClick={() => handleClick(1)}
          aria-label="simon-button-green"
        />
        <button
          type="button"
          className={styles.btnBlue}
          disabled={status !== SimonStatus.Playing}
          ref={btn3}
          onClick={() => handleClick(2)}
          aria-label="simon-button-blue"
        />
        <button
          type="button"
          className={styles.btnYellow}
          disabled={status !== SimonStatus.Playing}
          ref={btn4}
          onClick={() => handleClick(3)}
          aria-label="simon-button-yellow"
        />
      </div>
      <SimonBar difficulty={difficulty} />
    </div>
  );
};
