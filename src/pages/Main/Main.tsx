// Libraries
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

// Assets
import planet from '@Backgrounds/darkPlanet.webp';
import sea from '@Backgrounds/sea.webp';
import tree from '@Backgrounds/tree.webp';
import fog from '@Backgrounds/fog.webp';
import car from '@Backgrounds/car.webp';
import cat from '@Backgrounds/cat.webp';
import house from '@Backgrounds/house.gif';
import waterfall from '@Backgrounds/waterfall.gif';
import dynamic from '@Backgrounds/dynamic.gif';
import dynamic2 from '@Backgrounds/dynamic2.gif';

// Apps
import { Terminal } from '@Terminal/Terminal';
import { Settings } from '@Settings/Settings';
import { Calculator } from '@Calculator/Calculator';
import { ToDo } from '@ToDo/ToDo';
import { Chat } from '@Chat/Chat';
import { Simon } from '@Simon/Simon';
import { Minesweeper } from '@Minesweeper/Minesweeper';

// Components
import { MessageAlert } from '@Components/MessageAlert/MessageAlert';

// Types
import { RootState } from '@Types/rootState.type';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Enums
import { BackgroundImage } from '@Features/theme/types/backgroundImage';

// Styles
import styles from './main.module.css';

const Main: FC<ChildrenNever> = () => {
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

  return (
    <>
      <div style={{ backgroundImage: `url(${themeBackground})` }} className={styles.container} id="main-container">
        <div>
          <Terminal />
          <Settings />
          <Calculator />
          <ToDo />
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
