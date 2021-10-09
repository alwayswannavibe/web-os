// Libraries
import { FC, RefObject } from 'react';
import { useSelector } from 'react-redux';

// Types
import { RootState } from '@Types/rootState.type';

// Enums
import { SimonStatus } from '@Simon/enums/simonStatus.enum';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './simonButton.module.css';

interface Props extends ChildrenNever {
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
