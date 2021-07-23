// React, redux
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { CalculatorButtons } from 'src/apps/Calculator/components/CalculatorButtons';
import { CalculatorInput } from 'src/apps/Calculator/components/CalculatorInput';

// Hooks
import { useApp } from 'src/hooks/useApp';
import { useApps } from 'src/hooks/useApps';
import { Apps } from 'src/types/apps';

// Assets
import imgSource from 'src/assets/images/icons/calculator.svg';

// Styles
import styles from './calculator.module.css';

type PropsType = {
  children?: never;
};

const Calculator: FC<PropsType> = () => {
  const isCalculatorOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].isOpened);
  const isCalculatorCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].isCollapsed);
  const calculatorIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].iconPos.top);
  const calculatorIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].iconPos.left);
  const calculatorTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].windowPos.top);
  const calculatorLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Calculator].windowPos.left);

  const { getAppIndex } = useApps();
  const { handleOpen, handleClose, handleToggleCollapse } = useApp(Apps.Calculator);

  return (
    <>
      <div>
        <Icon
          title={Apps.Calculator}
          topCoord={calculatorIconTopCoord}
          leftCoord={calculatorIconLeftCoord}
          handleClick={handleOpen}
          imgSource={imgSource}
          changeCoord={changeIconPos}
          type={Apps.Calculator}
        />
      </div>
      <Window
        handleClose={handleClose}
        handleCollapse={handleToggleCollapse}
        title={Apps.Calculator}
        topCoord={calculatorTopCoord}
        leftCoord={calculatorLeftCoord}
        changeCoord={changeWindowPos}
        zIndexProp={100 - getAppIndex(Apps.Calculator)}
        type={Apps.Calculator}
        isOpen={isCalculatorOpen && !isCalculatorCollapsed}
      >
        <div className={styles.container}>
          <CalculatorInput />
          <CalculatorButtons />
        </div>
      </Window>
    </>
  );
};

export { Calculator };
