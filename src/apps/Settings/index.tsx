// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { setBackgroundImage } from 'src/features/theme/redux';
import { setLanguage } from 'src/features/i18n/redux';
import { RootState } from 'src/redux/store';

// I18n
import 'src/features/i18n';

// Types
import { Apps } from 'src/types/apps';
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';
import { Language } from 'src/features/i18n/types/language';

// Assets
import imgSource from 'src/assets/images/icons/settings.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { LanguageOption } from './components/LanguageOption';
import { BackgroundOption } from './components/BackgroundOption';

// Styles
import styles from './settings.module.css';

interface Props {
  children?: never;
}

export const Settings: FC<Props> = () => {
  const dispatch = useDispatch();

  const backgroundImage = useSelector((state: RootState) => state.theme.backgroundImage);
  const backgroundImages = useSelector((state: RootState) => state.theme.backgroundImages);
  const language = useSelector((state: RootState) => state.language.language);
  const languages = useSelector((state: RootState) => state.language.languages);
  const { t } = useTranslation('settings');

  const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedBackgroundImage: BackgroundImage = event.target.selectedOptions[0].value as BackgroundImage;
    if (Object.values(BackgroundImage).includes(seletedBackgroundImage)) {
      dispatch(setBackgroundImage({ backgroundImage: seletedBackgroundImage }));
    }
  };

  const handleLocaleTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedLanguage: Language = event.target.selectedOptions[0].value as Language;
    if (Object.values(Language).includes(seletedLanguage)) {
      dispatch(setLanguage({ language: seletedLanguage }));
    }
  };

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.Settings} />
      <Window type={Apps.Settings}>
        <form className={styles.form}>
          <div>
            <label htmlFor="themeSelect" className={styles.label}>
              {t('wallpapper')}
              <select id="themeSelect" className={styles.select} onChange={handleChangeTheme} defaultValue={backgroundImage}>
                {backgroundImages.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <BackgroundOption value={el} key={i} />
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="localeSelect" className={styles.label}>
              {t('language')}
              <select id="localeSelect" className={styles.select} onChange={handleLocaleTheme} defaultValue={language}>
                {languages.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <LanguageOption value={el} key={i} />
                ))}
              </select>
            </label>
          </div>
          <div className={styles.resetContainer}>
            <button
              className={styles.resetBtn}
              type="button"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              {t('reset')}
            </button>
          </div>
        </form>
      </Window>
    </>
  );
};
