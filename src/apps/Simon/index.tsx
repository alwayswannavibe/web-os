// React, redux
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeDifficulty } from 'src/redux/slices/appsSlicesBus/simonSlice';
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Assets
import imgSource from 'src/assets/images/icons/saymon.svg';

// Types
import { Apps } from 'src/types/apps';
import { Difficulties } from 'src/types/difficulties';

// Hooks
import { useApp } from 'src/hooks/useApp';

// Components
import { Icon } from 'src/components/Icon';
import { Window } from 'src/components/Window';
import { SimonFour } from './components/SimonFour';
import { SimonNine } from './components/SimonNine';

// Styles
import styles from './simon.module.css';

type PropsType = {
  children?: never;
};

export const Simon: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const isSimonOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].isOpened);
  const isSimonCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].isCollapsed);
  const simonIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].iconPos.top);
  const simonIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].iconPos.left);
  const simonTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].windowPos.top);
  const simonLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Simon].windowPos.left);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const difficulty = useSelector((state: RootState) => state.simon.difficulty);
  const { handleToggleCollapse, handleOpen, handleClose } = useApp(Apps.Simon);
  const { t } = useTranslation();

  const chooseDifficulty = (choosedDifficulty: Difficulties) => {
    dispatch(changeDifficulty({ difficulty: choosedDifficulty }));
  };

  return (
    <>
      <Icon
        imgSource={imgSource}
        title={Apps.Simon}
        topCoord={simonIconTopCoord}
        leftCoord={simonIconLeftCoord}
        handleClick={handleOpen}
        changeCoord={changeIconPos}
        type={Apps.Simon}
      />
      <Window
        handleClose={handleClose}
        title={Apps.Simon}
        topCoord={simonTopCoord}
        leftCoord={simonLeftCoord}
        isOpen={isSimonOpen && !isSimonCollapsed}
        zIndexProp={100 - apps.indexOf(Apps.Simon)}
        handleCollapse={handleToggleCollapse}
        changeCoord={changeWindowPos}
        type={Apps.Simon}
      >
        {difficulty === Difficulties.None && (
          <div className={styles.difficulties}>
            <h2>
              {t('simon.chooseDifficulty')}
              :
            </h2>
            <ul className={styles.difficultiesList}>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Easy)} type="button">{t(`simon.difficulties.${Difficulties.Easy}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Normal)} type="button">{t(`simon.difficulties.${Difficulties.Normal}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Hard)} type="button">{t(`simon.difficulties.${Difficulties.Hard}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Extreme)} type="button">{t(`simon.difficulties.${Difficulties.Extreme}`)}</button>
              </li>
            </ul>
          </div>
        )}
        {(difficulty === Difficulties.Easy || difficulty === Difficulties.Normal) && (
          <SimonFour />
        )}
        {(difficulty === Difficulties.Hard || difficulty === Difficulties.Extreme) && (
          <SimonNine />
        )}
      </Window>
    </>
  );
};
