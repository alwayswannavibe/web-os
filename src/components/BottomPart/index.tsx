// React
import React, { FC } from 'react';

// Redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapseTerminal } from 'redux/slices/terminalSlice';

// Components
import { BottomTab } from 'components/BottomTab';

// type import
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';
import { toggleCollapseSettings } from '../../redux/slices/settingsSlice';

// Types
type PropsType = {
  children?: never;
};

export const BottomPart: FC<PropsType> = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const dispatch = useDispatch();

  console.log(apps);

  return (
    <div className={styles.container}>
      {apps.includes(Apps.Terminal) && (
        <div className="bottomTab" style={{ order: apps.indexOf(Apps.Terminal) }}>
          <BottomTab title={Apps.Terminal} handleClick={() => dispatch(toggleCollapseTerminal())} />
        </div>
      )}
      {apps.includes(Apps.Settings) && (
        <div className="bottomTab" style={{ order: apps.indexOf(Apps.Settings) }}>
          <BottomTab title={Apps.Settings} handleClick={() => dispatch(toggleCollapseSettings())} />
        </div>
      )}
    </div>
  );
};
