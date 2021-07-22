// React, redux
import React, { FC } from 'react';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettingsCoord, changeSettingsIconCoord } from 'src/redux/slices/appsSlicesBus/settingsSlice';
import { setTheme } from 'src/redux/slices/themeSlice';
import { setLocale } from 'src/redux/slices/localeSlice';

// Hooks
import { useSettings } from 'src/hooks/useSettings';

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
            <label htmlFor="themeSelect" className={styles.label}>
              Theme:
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
              Locale:
              <select id="localeSelect" className={styles.select} onChange={handleLocaleTheme} defaultValue={locale}>
                <option value={Locales.Britain}>{Locales.Britain}</option>
                <option value={Locales.Russian}>{Locales.Russian}</option>
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
              Reset
            </button>
          </div>
        </form>
      </Window>
    </>
  );
};
