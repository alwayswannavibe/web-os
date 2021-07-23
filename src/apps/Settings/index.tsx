// React, redux
import React, { FC } from 'react';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'src/redux/slices/themeSlice';
import { setLocale } from 'src/redux/slices/localeSlice';
import { useTranslation } from 'react-i18next';
import 'src/i18n/i18next';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Hooks
import { useApp } from 'src/hooks/useApp';

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

  const isSettingsOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].isOpened);
  const isSettingsCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].isCollapsed);
  const settingsIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].iconPos.top);
  const settingsIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].iconPos.left);
  const settingsTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].windowPos.top);
  const settingsLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Settings].windowPos.left);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const locale = useSelector((state: RootState) => state.locale.locale);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const { handleClose, handleOpen, handleToggleCollapse } = useApp(Apps.Settings);
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
      <Icon
        title={Apps.Settings}
        topCoord={settingsIconTopCoord}
        leftCoord={settingsIconLeftCoord}
        handleClick={handleOpen}
        imgSource={imgSource}
        changeCoord={changeIconPos}
        type={Apps.Settings}
      />
      <Window
        handleClose={handleClose}
        handleCollapse={handleToggleCollapse}
        title={Apps.Settings}
        topCoord={settingsTopCoord}
        leftCoord={settingsLeftCoord}
        changeCoord={changeWindowPos}
        zIndexProp={100 - apps.indexOf(Apps.Settings)}
        type={Apps.Settings}
        isOpen={isSettingsOpen && !isSettingsCollapsed}
      >
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
