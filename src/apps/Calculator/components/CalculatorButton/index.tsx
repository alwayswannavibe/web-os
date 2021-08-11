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
} from 'src/apps/Calculator/redux';

// I18n
import 'src/features/i18n';

// Styles
import styles from './calculatorButton.module.css';

interface Props {
  children?: never;
  value: string;
}

const CalculatorButton: FC<Props> = ({ value }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('calculator');

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
