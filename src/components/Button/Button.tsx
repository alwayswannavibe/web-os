import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: 'reset' | 'submit' | 'button';
}

const Button: FC<Props> = ({ children, className, ...props }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button className={`${styles.button} ${className}`} {...props}>{children}</button>
);

export { Button };
