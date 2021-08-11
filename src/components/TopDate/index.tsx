// Libraries
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Types
import { RootState } from 'src/redux/store';

// Styles
import styles from './style.module.css';
import { Language } from '../../features/i18n/types/language';

interface Props {
  children?: never;
}

export const TopDate: FC<Props> = () => {
  const language = useSelector((state: RootState) => state.language.language);
  const [date, setDate] = useState(new Date());

  const locale = language === Language.Russian ? 'ru-RU' : 'en-GB';

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className={styles.date}>
      {date.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </div>
  );
};
