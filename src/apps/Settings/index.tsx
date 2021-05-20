// React
import React, { FC } from 'react';

// Components
import { Window } from 'components/Window';
import { Icon } from 'components/Icon';

// Redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettingsCoord, changeSettingsIconCoord } from 'redux/slices/appsSlicesBus/settingsSlice';
import { setTheme } from 'redux/slices/themeSlice';
import { setLocale } from 'redux/slices/localeSlice';
import { useSettings } from 'hooks/useSettings';

// import Types
import { Apps } from 'types/apps';
import { Themes } from 'types/themes';
import { Locales } from 'types/locales';

// Assets
import imgSource from 'assets/images/icons/settings.svg';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const Settings: FC<PropsType> = () => {
  // Init
  const dispatch = useDispatch();

  // Selectors
  const isSettingsOpen = useSelector((state: RootState) => state.settings.isSettingsOpen);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);
  const settingsIconTopCoord = useSelector((state: RootState) => state.settings.settingsIconTopCoord);
  const settingsIconLeftCoord = useSelector((state: RootState) => state.settings.settingsIconLeftCoord);
  const settingsTopCoord = useSelector((state: RootState) => state.settings.settingsTopCoord);
  const settingsLeftCoord = useSelector((state: RootState) => state.settings.settingsLeftCoord);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const locale = useSelector((state: RootState) => state.locale.locale);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const { handleSettingsCollapseToggle, handleOpenSettings, handleCloseSettings } = useSettings();

  // Handlers
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <>
      <Icon
        title={Apps.Settings}
        topCoord={settingsIconTopCoord}
        leftCoord={settingsIconLeftCoord}
        handleClick={handleOpenSettings}
        imgSource={imgSource}
        changeCoord={changeSettingsIconCoord}
      />
      <Window
        handleClose={handleCloseSettings}
        handleCollapse={handleSettingsCollapseToggle}
        title={Apps.Settings}
        topCoord={settingsTopCoord}
        leftCoord={settingsLeftCoord}
        changeCoord={changeSettingsCoord}
        zIndexProp={100 - apps.indexOf(Apps.Settings)}
        appType={Apps.Settings}
        isOpen={isSettingsOpen && !isSettingsCollapsed}
      >
        <form className={styles.form}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="themeSelect" className={styles.label}>
              Theme:
            </label>
            <select id="themeSelect" className={styles.select} onChange={handleChangeTheme} defaultValue={theme}>
              <option value={Themes.Planet}>{Themes.Planet}</option>
              <option value={Themes.Dynamic}>{Themes.Dynamic}</option>
              <option value={Themes.Dynamic2}>{Themes.Dynamic2}</option>
              <option value={Themes.Sea}>{Themes.Sea}</option>
              <option value={Themes.Car}>{Themes.Car}</option>
              <option value={Themes.Road}>{Themes.Road}</option>
              <option value={Themes.Tree}>{Themes.Tree}</option>
            </select>
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="localeSelect" className={styles.label}>
              Locale:
            </label>
            <select id="localeSelect" className={styles.select} onChange={handleLocaleTheme} defaultValue={locale}>
              <option value={Locales.Britain}>{Locales.Britain}</option>
              <option value={Locales.Russian}>{Locales.Russian}</option>
            </select>
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
              Reset
            </button>
          </div>
        </form>
      </Window>
    </>
  );
};
