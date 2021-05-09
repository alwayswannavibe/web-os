// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { openCalculator, closeCalculator, toggleCollapseCalculator } from 'redux/slices/appsSlicesBus/calculatorSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useCalculator = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isCalculatorCollapsed = useSelector((state: RootState) => state.calculator.isCalculatorCollapsed);
  const isCalculatorOpen = useSelector((state: RootState) => state.calculator.isCalculatorOpen);

  const dispatch = useDispatch();

  const handleCalculatorCollapseToggle = () => {
    if (isCalculatorCollapsed) {
      dispatch(setWindowActive(Apps.Calculator));
    } else if (apps.indexOf(Apps.Calculator) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseCalculator());
  };

  const handleOpenCalculator = () => {
    if (isCalculatorCollapsed && isCalculatorOpen) {
      dispatch(toggleCollapseCalculator());
      dispatch(setWindowActive(Apps.Calculator));
    } else if (!isCalculatorOpen) {
      dispatch(openCalculator());
      dispatch(addWindow(Apps.Calculator));
    }
  };

  const handleCloseCalculator = () => {
    if (!isCalculatorOpen) {
      return;
    }
    dispatch(closeCalculator());
    dispatch(deleteWindow(Apps.Calculator));
  };

  return {
    handleOpenCalculator,
    handleCloseCalculator,
    handleCalculatorCollapseToggle,
  };
};

export { useCalculator };
