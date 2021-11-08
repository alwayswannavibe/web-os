// Libraries
import { FC } from 'react';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './inDevelopment.module.css';

const InDevelopment: FC<ChildrenNever> = () => (
  <div className={styles.container}>
    <p>In development</p>
  </div>
);

export { InDevelopment };
