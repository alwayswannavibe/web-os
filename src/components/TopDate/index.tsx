// React
import React, { FC, useEffect, useState } from 'react';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const TopDate: FC<PropsType> = () => {
  // Init
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className={styles.date}>
      {date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </div>
  );
};
