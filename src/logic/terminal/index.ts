import { addTerminalHistory, clearTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import store from 'src/redux/store';
import i18n from 'src/i18n/i18next';
import { terminalProcessOpenCommand } from './open';
import { terminalProcessChangeCommand } from './change';

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
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableCommands')}: open, clear, change`));
      break;
    }
    case 'change': {
      terminalProcessChangeCommand(input.split(' ').slice(1).join(' '));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.unknownCommand')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.typeHelp')}`));
    }
  }
};

export { processTerminalInput };
