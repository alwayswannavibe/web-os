// Libraries
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

// Redux
import {
  addToCalculatorInput,
  clearCalculatorInput,
  deleteLastCalculatorInput,
  getCalculatorResult,
} from '@Calculator/redux/calculatorSlice/calculatorSlice';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Components
import { Button } from '@Components/Button/Button';

// Styles
import styles from './calculatorButton.module.css';

interface Props extends ChildrenNever {
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

  function getReadableValue() {
    if (value === 'Enter') {
      return t('calculator.enter');
    }
    if (value === '←') {
      return <FontAwesomeIcon icon={faDeleteLeft} />;
    }
    return value;
  }

  function getAriaLabel() {
    if (value === 'Enter') {
      return t('calculator.enter');
    }
    if (value === '←') {
      return t('calculator.deleteOne');
    }
    if (value === 'C') {
      return t('calculator.deleteAll');
    }
    return value;
  }

  return (
    <Button type="button" className={styles.button} onClick={handleClick} aria-label={getAriaLabel()}>
      {getReadableValue()}
    </Button>
  );
};

export { CalculatorButton };
