// React
import React, { FC, useEffect, useState } from 'react';

// Assets
import planet from 'assets/images/backgrounds/darkPlanet.jpg';
import sea from 'assets/images/backgrounds/sea.jpg';

// Components
import { Terminal } from 'components/Terminal';
import { Settings } from 'components/Settings';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

// Types import
import { Themes } from 'types/themes';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const MainPart: FC<PropsType> = () => {
  // Init
  const theme: Themes = useSelector((state: RootState) => state.theme.theme);
  const [themeBackground, setThemeBackground] = useState('');

  useEffect(() => {
    switch (theme) {
      case Themes.Planet: {
        setThemeBackground(planet);
        break;
      }
      case Themes.Sea: {
        setThemeBackground(sea);
        break;
      }
      default: {
        setThemeBackground(planet);
      }
    }
  }, [theme]);

  return (
    <>
      <div style={{ backgroundImage: `url(${themeBackground})` }} className={styles.container}>
        <div>
          <Terminal />
          <Settings />
        </div>
      </div>
    </>
  );
};
