// Libraries
import React, { FC } from 'react';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './error.module.css';

interface Props extends ChildrenNever {
  refetch: () => void;
}

const Error: FC<Props> = ({ refetch }: Props) => (
  <div className={styles.errorContainer}>
    Error, try again later
    <button type="button" onClick={refetch}>
      <FontAwesomeIcon icon={faArrowsRotate} />
    </button>
  </div>
);

export { Error };
