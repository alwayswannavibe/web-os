// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { setBackgroundImage, setTheme } from 'src/features/theme/redux';
import { setLanguage } from 'src/features/i18n/redux';
import { RootState } from 'src/redux/store';

// I18n
import 'src/features/i18n';

// Types
import { Apps } from 'src/types/apps';
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';
import { Language } from 'src/features/i18n/types/language';
import { Theme } from 'src/features/theme/types/theme';

// Assets
import imgSource from 'src/assets/images/icons/settings.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { SettingsOption } from './components/SettingsOption';

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
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themes = useSelector((state: RootState) => state.theme.themes);
  const { t } = useTranslation('settings');

  const handleChangeBackground = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedBackgroundImage = event.target.selectedOptions[0].value as BackgroundImage;
    if (Object.values(BackgroundImage).includes(seletedBackgroundImage)) {
      dispatch(setBackgroundImage({ backgroundImage: seletedBackgroundImage }));
    }
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedLanguage = event.target.selectedOptions[0].value as Language;
    if (Object.values(Language).includes(seletedLanguage)) {
      dispatch(setLanguage({ language: seletedLanguage }));
    }
  };

  const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedTheme = event.target.selectedOptions[0].value as Theme;
    if (Object.values(Theme).includes(seletedTheme)) {
      dispatch(setTheme({ theme: seletedTheme }));
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
              <select
                id="themeSelect"
                className={styles.select}
                onChange={handleChangeBackground}
                defaultValue={backgroundImage}
              >
                {backgroundImages.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SettingsOption value={el} category="backgrounds" key={i} />
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="localeSelect" className={styles.label}>
              {t('language')}
              <select id="localeSelect" className={styles.select} onChange={handleChangeLanguage} defaultValue={language}>
                {languages.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SettingsOption value={el} category="languages" key={i} />
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="themeSelect" className={styles.label}>
              {t('theme')}
              <select id="themeSelect" className={styles.select} onChange={handleChangeTheme} defaultValue={theme}>
                {themes.map((el, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <SettingsOption value={el} category="themes" key={i} />
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
