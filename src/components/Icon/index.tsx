// React, redux
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';

// Types
import { Apps } from 'src/types/apps';

// Styles
import styles from './style.module.css';

type PropsType = {
  imgSource: string;
  handleClick: ({ type }: { type: Apps }) => void;
  title: Apps;
  topCoord: string;
  leftCoord: string;
  changeCoord: any;
  type: Apps;
  children?: never;
};

export const Icon: FC<PropsType> = ({ imgSource, handleClick, title, topCoord, leftCoord, changeCoord, type }: PropsType) => {
  const icon = useRef<HTMLDivElement>(null);

  const { startDrag, topCoordLocal, leftCoordLocal } = useDragNDrop(changeCoord, icon, topCoord, leftCoord, type);
  const { t } = useTranslation();

  return (
    <div className={styles.container} style={{ top: topCoordLocal, left: leftCoordLocal }} ref={icon} data-cy={`icon-${title}`}>
      <button type="button" onDoubleClick={() => handleClick({ type })} className={styles.imgContainer} onMouseDown={startDrag} aria-label={`${title} icon`}>
        <img src={imgSource} alt="" className={`${styles.img}`} />
      </button>
      <span className={styles.title}>{t(`apps.${title}`)}</span>
    </div>
  );
};
