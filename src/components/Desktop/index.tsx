// React
import React, { FC } from 'react';

// Components
import { BottomPanel } from 'components/BottomPanel';
import { MainPart } from 'components/MainPart';
import { TopBar } from 'components/TopBar';

// Types
type PropsType = {
  children?: never;
};

export const Desktop: FC<PropsType> = () => (
  <>
    <TopBar />
    <MainPart />
    <BottomPanel />
  </>
);
