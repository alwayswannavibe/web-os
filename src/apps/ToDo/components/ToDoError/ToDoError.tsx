// Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './toDoError.module.css';

interface Props extends ChildrenNever {
  handleClick: () => void;
}

const ToDoError: FC<Props> = ({ handleClick }: Props) => (
  <div className={styles.error}>
    <span>Connection error, please try again later</span>
    <Button className={styles.closeError} onClick={handleClick}>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
  </div>
);

export { ToDoError };
