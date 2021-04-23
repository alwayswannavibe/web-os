// React, Redux
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

// Assets
import planet from 'assets/images/backgrounds/darkPlanet.jpg';
import sea from 'assets/images/backgrounds/sea.jpg';
import tree from 'assets/images/backgrounds/tree.jpg';
import road from 'assets/images/backgrounds/road.jpg';
import car from 'assets/images/backgrounds/car.jpg';
import dynamic from 'assets/images/backgrounds/dynamic.gif';
import dynamic2 from 'assets/images/backgrounds/dynamic2.gif';

// Components
import { Terminal } from 'components/Terminal';
import { Settings } from 'components/Settings';
import { Calculator } from 'components/Calculator';

// Types import
import { Themes } from 'types/themes';

// Styles
import { ToDoList } from 'components/ToDoList';
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

const Main: FC<PropsType> = () => {
  // Init
  const theme = useSelector((state: RootState) => state.theme.theme);
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
      case Themes.Car: {
        setThemeBackground(car);
        break;
      }
      case Themes.Tree: {
        setThemeBackground(tree);
        break;
      }
      case Themes.Road: {
        setThemeBackground(road);
        break;
      }
      case Themes.Dynamic: {
        setThemeBackground(dynamic);
        break;
      }
      case Themes.Dynamic2: {
        setThemeBackground(dynamic2);
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
          <Calculator />
          <ToDoList />
        </div>
      </div>
    </>
  );
};

export { Main };
