// Libraries
import { FC, RefObject } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { SimonStatus } from 'src/types/simonStatus';

// Styles
import styles from './simonButton.module.css';

interface Props {
  children?: never;
  btnRef: RefObject<HTMLButtonElement>;
  btnNumber: number;
  handleClick: (btnNumber: number) => void;
  numberOfButtons: number;
}

const SimonButton: FC<Props> = ({ btnRef, btnNumber, handleClick, numberOfButtons }: Props) => {
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
