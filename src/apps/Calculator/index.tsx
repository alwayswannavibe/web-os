// Libraries
import { FC } from 'react';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { CalculatorButtons } from 'src/apps/Calculator/components/CalculatorButtons';
import { CalculatorInput } from 'src/apps/Calculator/components/CalculatorInput';

// Hooks
import { Apps } from 'src/types/apps';

// Assets
import imgSource from 'src/assets/images/icons/calculator.svg';

// Styles
import styles from './calculator.module.css';

type PropsType = {
  children?: never;
};

const Calculator: FC<PropsType> = () => (
  <>
    <Icon imgSource={imgSource} type={Apps.Calculator} />
    <Window type={Apps.Calculator}>
      <div className={styles.container}>
        <CalculatorInput />
        <CalculatorButtons />
      </div>
    </Window>
  </>
);

export { Calculator };
