// React, redux
import { FC, useEffect, useRef } from 'react';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { simonClick, startShowing, updateStatus } from 'src/redux/slices/appsSlicesBus/simonSlice';

// Types
import { Difficulties } from 'src/types/difficulties';
import { SimonStatus } from 'src/types/simonStatus';

// Components
import { SimonBar } from 'src/apps/Simon/components/SimonBar/index';

// Styles
import styles from './symonEasy.module.css';

type PropsType = {
  children?: never;
};

export const SimonEasy: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const status = useSelector((store: RootState) => store.simon.simonStatus);
  const pattern = useSelector((store: RootState) => store.simon.pattern);

  const btn1 = useRef<HTMLButtonElement>(null);
  const btn2 = useRef<HTMLButtonElement>(null);
  const btn3 = useRef<HTMLButtonElement>(null);
  const btn4 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttons = [btn1, btn2, btn3, btn4];
    if (status === SimonStatus.Showing) {
      dispatch(startShowing({ buttons, activeClass: styles.btnActive }));
      setTimeout(() => {
        dispatch(updateStatus({ status: SimonStatus.Playing }));
      }, 900 * pattern.length + 200);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dispatch, status]);

  const handleClick = (numberOfButton: number) => {
    const buttons = [btn1, btn2, btn3, btn4];
    setTimeout(() => buttons[numberOfButton]!.current!.classList.add(styles.btnActive), 0);
    setTimeout(() => buttons[numberOfButton]!.current!.classList.remove(styles.btnActive), 400);
    setTimeout(() => dispatch(simonClick({ numberOfButton })), 400);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <button type="button" className={styles.btnRed} disabled={status !== SimonStatus.Playing} ref={btn1} onClick={() => handleClick(0)} />
        <button type="button" className={styles.btnGreen} disabled={status !== SimonStatus.Playing} ref={btn2} onClick={() => handleClick(1)} />
        <button type="button" className={styles.btnBlue} disabled={status !== SimonStatus.Playing} ref={btn3} onClick={() => handleClick(2)} />
        <button type="button" className={styles.btnYellow} disabled={status !== SimonStatus.Playing} ref={btn4} onClick={() => handleClick(3)} />
      </div>
      <SimonBar difficulty={Difficulties.Easy} />
    </div>
  );
};
