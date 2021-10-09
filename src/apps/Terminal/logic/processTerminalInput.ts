// Redux
import { addTerminalHistory, clearTerminalHistory } from '@Terminal/redux/terminalSlice/terminalSlice';
import store from 'src/redux/store';

// I18n
import i18n from '@Features/i18n';

// Logic
import { terminalProcessOpenCommand } from './open/terminalProcessOpenCommand';
import { terminalProcessChangeCommand } from './change/terminalProcessChangeCommand';

const processTerminalInput = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'open': {
      terminalProcessOpenCommand(input.split(' ').slice(1).join(' '));
      break;
    }
    case 'clear': {
      dispatch(clearTerminalHistory());
      break;
    }
    case 'help': {
      dispatch(addTerminalHistory(`${i18n.t('terminal:availableCommands')}: open, clear, change`));
      break;
    }
    case 'change': {
      terminalProcessChangeCommand(input.split(' ').slice(1).join(' '));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`${i18n.t('terminal:unknownCommand')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:typeHelp')}`));
    }
  }
};

export { processTerminalInput };
