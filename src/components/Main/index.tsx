// Libraries
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import planet from 'src/assets/images/backgrounds/darkPlanet.jpg';
import sea from 'src/assets/images/backgrounds/sea.jpg';
import tree from 'src/assets/images/backgrounds/tree.jpg';
import road from 'src/assets/images/backgrounds/road.jpg';
import car from 'src/assets/images/backgrounds/car.jpg';
import dynamic from 'src/assets/images/backgrounds/dynamic.gif';
import dynamic2 from 'src/assets/images/backgrounds/dynamic2.gif';

// Components
import { Terminal } from 'src/apps/Terminal';
import { Settings } from 'src/apps/Settings';
import { Calculator } from 'src/apps/Calculator';
import { ToDoList } from 'src/apps/ToDoList';
import { Chat } from 'src/apps/Chat';
import { Simon } from 'src/apps/Simon';
import { MessageAlert } from 'src/components/MessageAlert';

// Types
import { Themes } from 'src/types/themes';
import { RootState } from 'src/redux/store';
import { Apps } from 'src/types/apps';

// Redux
import { connect, disconnect } from 'src/redux/slices/websocketSlice';

// Styles
import styles from './style.module.css';

interface Props {
  children?: never;
}

const Main: FC<Props> = () => {
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

  const isChatOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].isOpened);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isChatOpen) {
      dispatch(connect());
    } else {
      dispatch(disconnect());
    }
  }, [dispatch, isChatOpen]);

  return (
    <>
      <div style={{ backgroundImage: `url(${themeBackground})` }} className={styles.container} id="main-container">
        <div>
          <Terminal />
          <Settings />
          <Calculator />
          <ToDoList />
          <Chat />
          <Simon />
          <MessageAlert />
        </div>
      </div>
    </>
  );
};

export { Main };
