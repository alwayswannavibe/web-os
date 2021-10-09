// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { changeDifficulty } from '@Simon/redux/simonSlice/simonSlice';

// I18n
import '@Features/i18n';

// Assets
import imgSource from '@Icons/saymon.svg';

// Enums
import { App } from '@Enums/app.enum';
import { Difficulty } from '@Enums/difficulty.enum';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Icon } from '@Components/Icon/Icon';
import { Window } from '@Components/Window/Window';
import { SimonMain } from '@Simon/components/SimonMain/SimonMain';

// Styles
import styles from './simon.module.css';

export const Simon: FC<ChildrenNever> = () => {
  const dispatch = useDispatch();

  const difficulty = useSelector((state: RootState) => state.simon.difficulty);
  const { t } = useTranslation('simon');

  const chooseDifficulty = (choosedDifficulty: Difficulty) => {
    dispatch(changeDifficulty({ difficulty: choosedDifficulty }));
  };

  return (
    <>
      <Icon imgSource={imgSource} type={App.Simon} />
      <Window type={App.Simon}>
        {difficulty === Difficulty.None && (
          <div className={styles.difficulties}>
            <h2>
              {t('simon.chooseDifficulty')}
              :
            </h2>
            <ul className={styles.difficultiesList}>
              <li>
                <button onClick={() => chooseDifficulty(Difficulty.Easy)} type="button">{t(`simon.difficulties.${Difficulty.Easy}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulty.Normal)} type="button">{t(`simon.difficulties.${Difficulty.Normal}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulty.Hard)} type="button">{t(`simon.difficulties.${Difficulty.Hard}`)}</button>
              </li>
              <li>
                <button onClick={() => chooseDifficulty(Difficulty.Extreme)} type="button">{t(`simon.difficulties.${Difficulty.Extreme}`)}</button>
              </li>
            </ul>
          </div>
        )}
        {(difficulty === Difficulty.Easy || difficulty === Difficulty.Normal) && (
          <SimonMain numberOfButtons={4} />
        )}
        {(difficulty === Difficulty.Hard || difficulty === Difficulty.Extreme) && (
          <SimonMain numberOfButtons={9} />
        )}
      </Window>
    </>
  );
};