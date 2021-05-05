// React, Redux
import React, { FC } from 'react';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
  value: string;
  handleClick: (value: string) => void;
};

const CalculatorButton: FC<PropsType> = ({ value, handleClick }: PropsType) => (
  <button type="button" className={styles.button} onClick={() => handleClick(value)}>
    {value}
  </button>
);

export { CalculatorButton };
