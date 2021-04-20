// React
import React, { FC } from 'react';

// Components
import { Window } from 'components/Window';
import { Icon } from 'components/Icon';

// Redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeSettings, openSettings, toggleCollapseSettings } from 'redux/slices/settingsSlice';

// import Types
import { Apps } from 'types/apps';

// Assets
import imgSource from 'assets/images/icons/settings.svg';

// Types
type PropsType = {
  children?: never;
};

export const Settings: FC<PropsType> = () => {
  // Init
  const dispatch = useDispatch();

  // Selectors
  const isSettingsOpen = useSelector((state: RootState) => state.settings.isSettingsOpen);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);
  const settingsIconTopCoord = useSelector((state: RootState) => state.settings.settingsIconTopCoord);
  const settingsIconLeftCoord = useSelector((state: RootState) => state.settings.settingsIconLeftCoord);
  const settingsTopCoord = useSelector((state: RootState) => state.settings.settingsTopCoord);
  const settingsLeftCoord = useSelector((state: RootState) => state.settings.settingsLeftCoord);

  // Handlers
  const handleClose = () => {
    dispatch(closeSettings());
  };

  const handleCollapse = () => {
    dispatch(toggleCollapseSettings());
  };

  const handleIconClick = () => {
    if (isSettingsCollapsed) {
      dispatch(toggleCollapseSettings());
    } else {
      dispatch(openSettings());
    }
  };

  return (
    <>
      <Icon
        title={Apps.Settings}
        topCoord={settingsIconTopCoord}
        leftCoord={settingsIconLeftCoord}
        handleClick={handleIconClick}
        imgSource={imgSource}
      />
      {isSettingsOpen && !isSettingsCollapsed && (
        <Window
          handleClose={handleClose}
          handleCollapse={handleCollapse}
          title={Apps.Settings}
          topCoord={settingsTopCoord}
          leftCoord={settingsLeftCoord}
        />
      )}
    </>
  );
};
