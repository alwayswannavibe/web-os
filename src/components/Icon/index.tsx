// React, redux
import { FC, useRef } from 'react';
import { changeIconPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// I18n
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop';
import { useApp } from 'src/hooks/useApp';

// Types
import { Apps } from 'src/types/apps';

// Styles
import styles from './style.module.css';

type PropsType = {
  imgSource: string;
  type: Apps;
  children?: never;
};

export const Icon: FC<PropsType> = ({ imgSource, type }: PropsType) => {
  const iconCoords = useSelector((state: RootState) => state.appsState.apps[type].iconPos);

  const icon = useRef<HTMLDivElement>(null);

  const { startDrag, newCoords } = useDragNDrop(changeIconPos, icon, iconCoords, type);
  const { t } = useTranslation();
  const { handleOpen } = useApp(type);

  return (
    <div
      className={styles.container}
      style={{ top: newCoords?.top, left: newCoords?.left }}
      ref={icon}
      data-cy={`icon-${type}`}
    >
      <button
        type="button"
        onDoubleClick={handleOpen}
        className={styles.imgContainer}
        onMouseDown={startDrag}
        aria-label={`${type} icon`}
      >
        <img src={imgSource} alt="" className={`${styles.img}`} />
      </button>
      <span className={styles.title}>{t(`apps.${type}`)}</span>
    </div>
  );
};
