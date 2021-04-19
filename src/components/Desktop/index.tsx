// React
import React, { FC } from 'react';

// Components
import { BottomPart } from 'components/BottomPart';
import { MainPart } from 'components/MainPart';
import { TopBar } from 'components/TopBar';

// Types
type PropsType = {
  children?: never
};

export const Desktop: FC<PropsType> = () => (
  <>
    <TopBar />
    <MainPart />
    <BottomPart />
  </>
);
