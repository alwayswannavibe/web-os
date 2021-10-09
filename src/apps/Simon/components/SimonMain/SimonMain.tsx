/* eslint-disable react-hooks/exhaustive-deps */

// Libraries
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { simonClick, startShowing, updateStatus } from '@Simon/redux/simonSlice/simonSlice';

// Enums
import { SimonStatus } from '@Simon/enums/simonStatus.enum';
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Assets
import sound1 from '@Sounds/simon/simon1.wav';
import sound2 from '@Sounds/simon/simon2.wav';
import sound3 from '@Sounds/simon/simon3.wav';
import sound4 from '@Sounds/simon/simon4.wav';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { SimonBar } from '@Simon/components/SimonBar/SimonBar';
import { SimonButton } from '@Simon/components/SimonButton/SimonButton';

// Styles
import styles from './simonMain.module.css';

interface Props extends ChildrenNever {
  numberOfButtons: number;
}

export const SimonMain: FC<Props> = ({ numberOfButtons }: Props) => {
  const dispatch = useDispatch();

  const status = useSelector((store: RootState) => store.simon.simonStatus);
  const pattern = useSelector((store: RootState) => store.simon.pattern);
  const level = useSelector((store: RootState) => store.simon.level);
  const isSimonOpen = useSelector((store: RootState) => store.apps.appsState[App.Simon].isOpened);
  const difficulty = useSelector((store: RootState) => store.simon.difficulty);

  const btnRef1 = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);
  const btnRef3 = useRef<HTMLButtonElement>(null);
  const btnRef4 = useRef<HTMLButtonElement>(null);
  const btnRef5 = useRef<HTMLButtonElement>(null);
  const btnRef6 = useRef<HTMLButtonElement>(null);
  const btnRef7 = useRef<HTMLButtonElement>(null);
  const btnRef8 = useRef<HTMLButtonElement>(null);
  const btnRef9 = useRef<HTMLButtonElement>(null);

  const sounds = [sound1, sound2, sound3, sound4];
  const buttonsRefs = [btnRef1, btnRef2, btnRef3, btnRef4, btnRef5, btnRef6, btnRef7, btnRef8, btnRef9];
  const buttonsRefsWithLimit = buttonsRefs.slice(0, numberOfButtons);

  function handleClick(numberOfButton: number): void {
    new Audio(sounds[numberOfButton]).play();
    setTimeout(() => buttonsRefs[numberOfButton]?.current?.classList.add(styles.btnActive), 0);
    setTimeout(() => buttonsRefs[numberOfButton]?.current?.classList.remove(styles.btnActive), 400);
    setTimeout(() => dispatch(simonClick({ numberOfButton })), 400);
  }

  useEffect(() => {
    if (status === SimonStatus.Showing) {
      if (pattern.length !== 3 + (level - 1)) {
        dispatch(startShowing());
      } else {
        pattern.forEach((el, index) => {
          setTimeout(() => {
            new Audio(sounds[el]).play();
          }, 900 * index + 900);
          setTimeout(() => buttonsRefs[el]?.current?.classList.add(styles.btnActive), 900 * index + 900);
          setTimeout(() => buttonsRefs[el]?.current?.classList.remove(styles.btnActive), 900 * index + 1400);
        });
        setTimeout(() => {
          dispatch(updateStatus({ status: SimonStatus.Playing }));
        }, 900 * pattern.length + 400);
      }
    }
  }, [isSimonOpen, pattern, level, status]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {buttonsRefsWithLimit.map((ref, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SimonButton btnRef={ref} handleClick={handleClick} btnNumber={index} numberOfButtons={numberOfButtons} key={index} />
        ))}
      </div>
      <SimonBar difficulty={difficulty} />
    </div>
  );
};
