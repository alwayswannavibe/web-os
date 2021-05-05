// React, Redux
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { changeCalculatorCoord, changeCalculatorIconCoord } from 'redux/slices/calculatorSlice';
import { RootState } from 'redux/store';

// Components
import { CalculatorButtons } from 'components/Calculator/components/CalculatorButtons';
import { CalculatorInput } from 'components/Calculator/components/CalculatorInput';
import { Window } from 'components/Window';
import { Icon } from 'components/Icon';

// Hooks
import { useCalculator } from 'hooks/useCalculator';
import { useApps } from 'hooks/useApps';

// Types
import { Apps } from 'types/apps';

// Assets
import imgSource from 'assets/images/icons/calculator.svg';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

const Calculator: FC<PropsType> = () => {
  const isCalculatorOpen = useSelector((state: RootState) => state.calculator.isCalculatorOpen);
  const isCalculatorCollapsed = useSelector((state: RootState) => state.calculator.isCalculatorCollapsed);
  const calculatorIconTopCoord = useSelector((state: RootState) => state.calculator.calculatorIconTopCoord);
  const calculatorIconLeftCoord = useSelector((state: RootState) => state.calculator.calculatorIconLeftCoord);
  const calculatorTopCoord = useSelector((state: RootState) => state.calculator.calculatorTopCoord);
  const calculatorLeftCoord = useSelector((state: RootState) => state.calculator.calculatorLeftCoord);

  const { handleOpenCalculator, handleCloseCalculator, handleCalculatorCollapseToggle } = useCalculator();
  const { getAppIndex } = useApps();

  return (
    <>
      <div id="calculator-icon">
        <Icon
          title={Apps.Calculator}
          topCoord={calculatorIconTopCoord}
          leftCoord={calculatorIconLeftCoord}
          handleClick={handleOpenCalculator}
          imgSource={imgSource}
          changeCoord={changeCalculatorIconCoord}
        />
      </div>
      {isCalculatorOpen && !isCalculatorCollapsed && (
        <div id="calculator-window">
          <Window
            handleClose={handleCloseCalculator}
            handleCollapse={handleCalculatorCollapseToggle}
            title={Apps.Calculator}
            topCoord={calculatorTopCoord}
            leftCoord={calculatorLeftCoord}
            changeCoord={changeCalculatorCoord}
            zIndexProp={100 - getAppIndex(Apps.Calculator)}
            appType={Apps.Calculator}
          >
            <div className={styles.container} id="calculator-content">
              <CalculatorInput />
              <CalculatorButtons />
            </div>
          </Window>
        </div>
      )}
    </>
  );
};

export { Calculator };
