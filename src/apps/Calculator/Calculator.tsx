// Libraries
import { FC } from 'react';

// Components
import { Window } from '@Components/Window/Window';
import { Icon } from '@Components/Icon/Icon';
import { CalculatorButtons } from '@Calculator/components/CalculatorButtons/CalculatorButtons';
import { CalculatorInput } from '@Calculator/components/CalculatorInput/CalculatorInput';

// Types
import { App } from '@Enums/app.enum';

// Assets
import imgSource from '@Icons/calculator.svg';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './calculator.module.css';

const Calculator: FC<ChildrenNever> = () => (
  <>
    <Icon imgSource={imgSource} type={App.Calculator} />
    <Window type={App.Calculator}>
      <div className={styles.container}>
        <CalculatorInput />
        <CalculatorButtons />
      </div>
    </Window>
  </>
);

export { Calculator };
