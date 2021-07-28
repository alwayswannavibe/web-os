// Libraries
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Redux
import {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
} from 'src/redux/slices/appsSlicesBus/calculatorSlice';

// I18n
import 'src/i18n/i18next';

// Styles
import styles from './calculatorButton.module.css';

type PropsType = {
  children?: never;
  value: string;
};

const CalculatorButton: FC<PropsType> = ({ value }: PropsType) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
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

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      {value === 'Enter' ? t('calculator.enter') : value}
    </button>
  );
};

export { CalculatorButton };
