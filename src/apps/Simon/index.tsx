// React, redux
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeDifficulty } from 'src/redux/slices/appsSlicesBus/simonSlice';
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';

// Assets
import imgSource from 'src/assets/images/icons/saymon.svg';

// Types
import { Apps } from 'src/types/apps';
import { Difficulties } from 'src/types/difficulties';

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

  const difficulty = useSelector((state: RootState) => state.simon.difficulty);
  const { t } = useTranslation();

  const chooseDifficulty = (choosedDifficulty: Difficulties) => {
    dispatch(changeDifficulty({ difficulty: choosedDifficulty }));
  };

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.Simon} />
      <Window type={Apps.Simon}>
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
