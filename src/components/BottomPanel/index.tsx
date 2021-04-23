// React, Redux
import React, { FC } from 'react';

// Components
import { BottomTab } from 'components/BottomTab';

// Hooks
import { useTerminal } from 'hooks/useTerminal';
import { useSettings } from 'hooks/useSettings';
import { useCalculator } from 'hooks/useCalculator';

// Types
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';
import { useToDo } from '../../hooks/useToDo';

type PropsType = {
  children?: never;
};

const BottomPanel: FC<PropsType> = () => {
  const { handleTerminalCollapseToggle, handleOpenTerminal } = useTerminal();
  const { handleSettingsCollapseToggle, handleOpenSettings } = useSettings();
  const { handleCalculatorCollapseToggle, handleOpenCalculator } = useCalculator();
  const { handleToDoCollapseToggle, handleOpenToDo } = useToDo();

  return (
    <div className={styles.container}>
      <BottomTab
        handleOpen={handleOpenTerminal}
        handleCollapse={handleTerminalCollapseToggle}
        type={Apps.Terminal}
        iconName="terminal"
      />
      <BottomTab
        handleOpen={handleOpenSettings}
        handleCollapse={handleSettingsCollapseToggle}
        type={Apps.Settings}
        iconName="cogs"
      />
      <BottomTab
        handleOpen={handleOpenCalculator}
        handleCollapse={handleCalculatorCollapseToggle}
        type={Apps.Calculator}
        iconName="calculator"
      />
      <BottomTab
        handleOpen={handleOpenToDo}
        handleCollapse={handleToDoCollapseToggle}
        type={Apps.ToDo}
        iconName="clipboard-list"
      />
    </div>
  );
};

export { BottomPanel };
