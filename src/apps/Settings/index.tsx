// Libraries
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import { setTheme } from 'src/redux/slices/themeSlice';
import { setLocale } from 'src/redux/slices/localeSlice';
import { RootState } from 'src/redux/store';

// I18n
import 'src/i18n/i18next';

// Types
import { Apps } from 'src/types/apps';
import { Themes } from 'src/types/themes';
import { Locales } from 'src/types/locales';

// Assets
import imgSource from 'src/assets/images/icons/settings.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './settings.module.css';

type PropsType = {
  children?: never;
};

export const Settings: FC<PropsType> = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const locale = useSelector((state: RootState) => state.locale.locale);
  const { t } = useTranslation();

  const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedTheme: Themes = event.target.selectedOptions[0].value as Themes;
    if (Object.values(Themes).includes(seletedTheme)) {
      dispatch(setTheme(seletedTheme));
    }
  };

  const handleLocaleTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const seletedLocale: Locales = event.target.selectedOptions[0].value as Locales;
    if (Object.values(Locales).includes(seletedLocale)) {
      dispatch(setLocale(seletedLocale));
    }
  };

  return (
    <>
      <Icon imgSource={imgSource} type={Apps.Settings} />
      <Window type={Apps.Settings}>
        <form className={styles.form}>
          <div>
            <label htmlFor="themeSelect" className={styles.label}>
              {t('settings.theme')}
              <select id="themeSelect" className={styles.select} onChange={handleChangeTheme} defaultValue={theme}>
                <option value={Themes.Planet}>{Themes.Planet}</option>
                <option value={Themes.Dynamic}>{Themes.Dynamic}</option>
                <option value={Themes.Dynamic2}>{Themes.Dynamic2}</option>
                <option value={Themes.Sea}>{Themes.Sea}</option>
                <option value={Themes.Car}>{Themes.Car}</option>
                <option value={Themes.Road}>{Themes.Road}</option>
                <option value={Themes.Tree}>{Themes.Tree}</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="localeSelect" className={styles.label}>
              {t('settings.locale')}
              <select id="localeSelect" className={styles.select} onChange={handleLocaleTheme} defaultValue={locale}>
                <option value={Locales.Britain}>{t('settings.locales.english')}</option>
                <option value={Locales.Russian}>{t('settings.locales.russian')}</option>
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
              {t('settings.reset')}
            </button>
          </div>
        </form>
      </Window>
    </>
  );
};
