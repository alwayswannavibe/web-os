// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { setBackgroundImage, setTheme } from '@Features/theme/redux';
import { setLanguage } from '@Features/i18n/redux';

// Types
import { RootState } from '@Types/rootState.type';

// I18n
import '@Features/i18n';

// Enums
import { App } from '@Enums/app.enum';
import { BackgroundImage } from '@Features/theme/types/backgroundImage';
import { Language } from '@Features/i18n/types/language';
import { Theme } from '@Features/theme/types/theme';

// Interface
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Assets
import imgSource from '@Icons/settings.svg';

// Components
import { Window } from '@Components/Window/Window';
import { Icon } from '@Components/Icon/Icon';
import { SettingsOption } from '@Settings/components/SettingsOption/SettingsOption';

// Styles
import styles from './settings.module.css';

export const Settings: FC<ChildrenNever> = () => {
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
      <Icon imgSource={imgSource} type={App.Settings} />
      <Window type={App.Settings}>
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
