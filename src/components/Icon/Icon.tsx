// Libraries
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { changeIconPos } from 'src/redux/slices/appsSlice/appsSlice';

// I18n
import { useTranslation } from 'react-i18next';

// Hooks
import { useDragNDrop } from 'src/hooks/useDragNDrop/useDragNDrop';
import { useApp } from 'src/hooks/useApp/useApp';

// Enums
import { App } from '@Enums/app.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './icon.module.css';

interface Props extends ChildrenNever {
  imgSource: string;
  type: App;
}

export const Icon: FC<Props> = ({ imgSource, type }: Props) => {
  const iconCoords = useSelector((state: RootState) => state.apps.appsState[type].iconPos);

  const icon = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const { handleOpen } = useApp(type);
  const { startDrag, newCoords } = useDragNDrop(changeIconPos, icon, iconCoords, type);

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
