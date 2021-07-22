// React, redux
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeDifficulty, changeSimonCoord, changeSimonIconCoord } from 'src/redux/slices/appsSlicesBus/simonSlice';

// Assets
import imgSource from 'src/assets/images/icons/saymon.svg';

// Types
import { Apps } from 'src/types/apps';
import { Difficulties } from 'src/types/difficulties';

// Hooks
import { useSimon } from 'src/hooks/useSimon';

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

  const isSimonOpen = useSelector((state: RootState) => state.simon.isSimonOpen);
  const isSimonCollapsed = useSelector((state: RootState) => state.simon.isSimonCollapsed);
  const simonIconTopCoord = useSelector((state: RootState) => state.simon.simonIconTopCoord);
  const simonIconLeftCoord = useSelector((state: RootState) => state.simon.simonIconLeftCoord);
  const simonTopCoord = useSelector((state: RootState) => state.simon.simonTopCoord);
  const simonLeftCoord = useSelector((state: RootState) => state.simon.simonLeftCoord);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const difficulty = useSelector((state: RootState) => state.simon.difficulty);
  const { handleSimonCollapseToggle, handleOpenSimon, handleCloseSimon } = useSimon();

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
        handleClick={handleOpenSimon}
        changeCoord={changeSimonIconCoord}
      />
      <Window
        handleClose={handleCloseSimon}
        title={Apps.Simon}
        topCoord={simonTopCoord}
        leftCoord={simonLeftCoord}
        isOpen={isSimonOpen && !isSimonCollapsed}
        zIndexProp={100 - apps.indexOf(Apps.Simon)}
        handleCollapse={handleSimonCollapseToggle}
        changeCoord={changeSimonCoord}
        appType={Apps.Simon}
      >
        {difficulty === Difficulties.None && (
          <div className={styles.difficulties}>
            <h2>Choose difficulty:</h2>
            <ul className={styles.difficultiesList}>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Easy)} type="button">{Difficulties.Easy}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Normal)} type="button">{Difficulties.Normal}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Hard)} type="button">{Difficulties.Hard}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulties.Extreme)} type="button">{Difficulties.Extreme}</button>
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
