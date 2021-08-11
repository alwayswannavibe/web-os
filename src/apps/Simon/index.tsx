// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { changeDifficulty } from 'src/apps/Simon/redux';

// I18n
import 'src/features/i18n';

// Assets
import imgSource from 'src/assets/images/icons/saymon.svg';

// Types
import { Apps } from 'src/types/apps';
import { Difficulties } from 'src/types/difficulties';
import { RootState } from 'src/redux/store';

// Components
import { Icon } from 'src/components/Icon';
import { Window } from 'src/components/Window';
import { SimonMain } from './components/SimonMain';

// Styles
import styles from './simon.module.css';

type PropsType = {
  children?: never;
};

export const Simon: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const difficulty = useSelector((state: RootState) => state.simon.difficulty);
  const { t } = useTranslation('simon');

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
          <SimonMain numberOfButtons={4} />
        )}
        {(difficulty === Difficulties.Hard || difficulty === Difficulties.Extreme) && (
          <SimonMain numberOfButtons={9} />
        )}
      </Window>
    </>
  );
};
