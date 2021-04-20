// React
import React, { FC } from 'react';

// Types
type PropsType = {
  title: string;
  // eslint-disable-next-line react/require-default-props
  children?: never;
};

export const BottomTab: FC<PropsType> = ({ title }: PropsType) => <>{title}</>;
