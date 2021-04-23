// React, Redux
import React, { FC, ReactNode } from 'react';

// Components
import { Window } from 'components/Window';
import { useCalculator } from 'hooks/useCalculator';
import { setWindowActive } from 'redux/slices/appsSlice';
import { Apps } from 'types/apps';
import { Icon } from 'components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCalculatorInput,
  changeCalculatorCoord,
  changeCalculatorIconCoord,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
  setCalculatorInput,
} from 'redux/slices/calculatorSlice';
import imgSource from 'assets/images/icons/calculator.svg';
import { RootState } from '../../redux/store';
import { useApps } from '../../hooks/useApps';
import { CalculatorButton } from '../CalculatorButton';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

const Calculator: FC<PropsType> = () => {
  const { handleOpenCalculator, handleCloseCalculator, handleCalculatorCollapseToggle } = useCalculator();
  const { getAppIndex } = useApps();
  const dispatch = useDispatch();
  const isCalculatorOpen = useSelector((state: RootState) => state.calculator.isCalculatorOpen);
  const isCalculatorCollapsed = useSelector((state: RootState) => state.calculator.isCalculatorCollapsed);
  const calculatorIconTopCoord = useSelector((state: RootState) => state.calculator.calculatorIconTopCoord);
  const calculatorIconLeftCoord = useSelector((state: RootState) => state.calculator.calculatorIconLeftCoord);
  const calculatorTopCoord = useSelector((state: RootState) => state.calculator.calculatorTopCoord);
  const calculatorLeftCoord = useSelector((state: RootState) => state.calculator.calculatorLeftCoord);
  const inputValue = useSelector((state: RootState) => state.calculator.inputValue);
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const operationButtons = ['+', '-', '*', '/', '^', '.', 'C'];

  const handleClick = (value: string) => {
    if (value === 'Enter') {
      dispatch(getCalculatorResult());
    } else if (value === '←') {
      dispatch(deleteLastCalculatorInput());
    } else if (value === 'C') {
      dispatch(clearCalculatorInput());
    } else {
      dispatch(addToCalculatorInput(value));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[\d, +, \-, *, ^, /, .]*$/);
    const regExp2 = new RegExp(/^\S*$/);
    if (regExp.test(event.target.value) && regExp2.test(event.target.value)) {
      dispatch(setCalculatorInput(event.target.value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(getCalculatorResult());
  };

  return (
    <div onClick={() => setWindowActive(Apps.Calculator)}>
      <Icon
        title={Apps.Calculator}
        topCoord={calculatorIconTopCoord}
        leftCoord={calculatorIconLeftCoord}
        handleClick={handleOpenCalculator}
        imgSource={imgSource}
        changeCoord={changeCalculatorIconCoord}
      />
      {isCalculatorOpen && !isCalculatorCollapsed && (
        <Window
          handleClose={handleCloseCalculator}
          handleCollapse={handleCalculatorCollapseToggle}
          title={Apps.Calculator}
          topCoord={calculatorTopCoord}
          leftCoord={calculatorLeftCoord}
          changeCoord={changeCalculatorCoord}
          zIndexProp={100 - getAppIndex(Apps.Calculator)}
          handleSetActive={() => dispatch(setWindowActive(Apps.Calculator))}
        >
          <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="text" className={styles.input} value={inputValue} onChange={handleChange} />
            </form>
            <div className={styles.buttons}>
              <div className={styles.numberButtons}>
                {numberButtons.map(
                  (value): ReactNode => (
                    <div className={styles.numberButton} key={value}>
                      <CalculatorButton value={value} handleClick={handleClick} />
                    </div>
                  ),
                )}
                <div className={styles.zeroButton}>
                  <CalculatorButton value="0" handleClick={handleClick} />
                </div>
              </div>
              <div className={styles.operationButtons}>
                {operationButtons.map(
                  (value): ReactNode => (
                    <div className={styles.operationButton} key={value}>
                      <CalculatorButton value={value} handleClick={handleClick} />
                    </div>
                  ),
                )}
                <div className={styles.clearOneButton}>
                  <CalculatorButton value="←" handleClick={handleClick} />
                </div>
                <div className={styles.enterButton}>
                  <CalculatorButton value="Enter" handleClick={handleClick} />
                </div>
              </div>
            </div>
          </div>
        </Window>
      )}
    </div>
  );
};

export { Calculator };
