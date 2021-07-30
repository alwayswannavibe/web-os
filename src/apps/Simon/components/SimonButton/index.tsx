// Libraries
import { FC, RefObject } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { SimonStatus } from 'src/types/simonStatus';

// Styles
import styles from './simonButton.module.css';

type PropsType = {
  children?: never;
  btnRef: RefObject<HTMLButtonElement>;
  btnNumber: number;
  handleClick: (btnNumber: number) => void;
  numberOfButtons: number;
};

const SimonButton: FC<PropsType> = ({ btnRef, btnNumber, handleClick, numberOfButtons }: PropsType) => {
  const status = useSelector((store: RootState) => store.simon.simonStatus);

  return (
    <button
      type="button"
      disabled={status !== SimonStatus.Playing}
      ref={btnRef}
      onClick={() => handleClick(btnNumber)}
      aria-label="simon-button"
      className={styles[`btn${numberOfButtons}`]}
    />
  );
};

export { SimonButton };
