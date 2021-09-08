// Libraries
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import planet from 'src/assets/images/backgrounds/darkPlanet.webp';
import sea from 'src/assets/images/backgrounds/sea.webp';
import tree from 'src/assets/images/backgrounds/tree.webp';
import fog from 'src/assets/images/backgrounds/fog.webp';
import car from 'src/assets/images/backgrounds/car.webp';
import cat from 'src/assets/images/backgrounds/cat.webp';
import house from 'src/assets/images/backgrounds/house.gif';
import waterfall from 'src/assets/images/backgrounds/waterfall.gif';
import dynamic from 'src/assets/images/backgrounds/dynamic.gif';
import dynamic2 from 'src/assets/images/backgrounds/dynamic2.gif';

// Components
import { Terminal } from 'src/apps/Terminal';
import { Settings } from 'src/apps/Settings';
import { Calculator } from 'src/apps/Calculator';
import { ToDoList } from 'src/apps/ToDoList';
import { Chat } from 'src/apps/Chat';
import { Simon } from 'src/apps/Simon';
import { Minesweeper } from 'src/apps/Minesweeper';
import { MessageAlert } from 'src/components/MessageAlert';

// Types
import { RootState } from 'src/redux/store';
import { Apps } from 'src/types/apps';
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

// Redux
import { connect, disconnect } from 'src/features/websocket/redux';

// Styles
import styles from './style.module.css';

interface Props {
  children?: never;
}

const Main: FC<Props> = () => {
  const backgroundImage = useSelector((state: RootState) => state.theme.backgroundImage);
  const [themeBackground, setThemeBackground] = useState('');

  const backgroundImagesAssets = useMemo(() => ({
    [BackgroundImage.Car]: car,
    [BackgroundImage.Fog]: fog,
    [BackgroundImage.Sea]: sea,
    [BackgroundImage.Dynamic]: dynamic,
    [BackgroundImage.Dynamic2]: dynamic2,
    [BackgroundImage.Planet]: planet,
    [BackgroundImage.Tree]: tree,
    [BackgroundImage.Cat]: cat,
    [BackgroundImage.House]: house,
    [BackgroundImage.Waterfall]: waterfall,
  }), []);

  useEffect(() => {
    setThemeBackground(backgroundImagesAssets[backgroundImage]);
  }, [backgroundImage, backgroundImagesAssets]);

  const isChatOpen = useSelector((state: RootState) => state.apps.appsState[Apps.Chat].isOpened);

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
          <Minesweeper />
          <MessageAlert />
        </div>
      </div>
    </>
  );
};

export { Main };
