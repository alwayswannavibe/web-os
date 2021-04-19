// React
import React, { FC, useEffect, useState } from 'react';

// Assets
import planet from 'assets/images/backgrounds/darkPlanet.jpg';
import sea from 'assets/images/backgrounds/sea.jpg';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const MainPart: FC<PropsType> = () => {
  // Init
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [themeBackground, setThemeBackground] = useState('planet');

  useEffect(() => {
    switch (theme) {
      case 'planet': {
        setThemeBackground(planet);
        break;
      }
      case 'sea': {
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
      <div style={{ backgroundImage: `url(${themeBackground})` }} className={styles.container} />
    </>
  );
};
