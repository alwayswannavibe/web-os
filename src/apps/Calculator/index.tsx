// React, redux
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { changeCalculatorCoord, changeCalculatorIconCoord } from 'src/redux/slices/appsSlicesBus/calculatorSlice';
import { RootState } from 'src/redux/store';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { CalculatorButtons } from 'src/apps/Calculator/components/CalculatorButtons';
import { CalculatorInput } from 'src/apps/Calculator/components/CalculatorInput';

// Hooks
import { useCalculator } from 'src/hooks/useCalculator';
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
  const isCalculatorOpen = useSelector((state: RootState) => state.calculator.isCalculatorOpen);
  const isCalculatorCollapsed = useSelector((state: RootState) => state.calculator.isCalculatorCollapsed);
  const calculatorIconTopCoord = useSelector((state: RootState) => state.calculator.calculatorIconTopCoord);
  const calculatorIconLeftCoord = useSelector((state: RootState) => state.calculator.calculatorIconLeftCoord);
  const calculatorTopCoord = useSelector((state: RootState) => state.calculator.calculatorTopCoord);
  const calculatorLeftCoord = useSelector((state: RootState) => state.calculator.calculatorLeftCoord);

  const { getAppIndex } = useApps();
  const { handleOpenCalculator, handleCloseCalculator, handleCalculatorCollapseToggle } = useCalculator();

  return (
    <>
      <div>
        <Icon
          title={Apps.Calculator}
          topCoord={calculatorIconTopCoord}
          leftCoord={calculatorIconLeftCoord}
          handleClick={handleOpenCalculator}
          imgSource={imgSource}
          changeCoord={changeCalculatorIconCoord}
        />
      </div>
      <Window
        handleClose={handleCloseCalculator}
        handleCollapse={handleCalculatorCollapseToggle}
        title={Apps.Calculator}
        topCoord={calculatorTopCoord}
        leftCoord={calculatorLeftCoord}
        changeCoord={changeCalculatorCoord}
        zIndexProp={100 - getAppIndex(Apps.Calculator)}
        appType={Apps.Calculator}
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
