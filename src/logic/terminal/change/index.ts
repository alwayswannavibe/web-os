import { addTerminalHistory } from 'redux/slices/terminalSlice';
import store from 'redux/store';
import { terminalProcessChangeLocale } from './locale';
import { terminalProcessChangeTheme } from './theme';

const terminalProcessChangeCommand = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'theme':
    case '-t': {
      terminalProcessChangeTheme(input.split(' ').slice(1).join(' '));
      break;
    }
    case 'locale':
    case '-l': {
      terminalProcessChangeLocale(input.split(' ').slice(1).join(' '));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory('> This command changes value of category'));
      dispatch(addTerminalHistory('> Available categories: locale (alias -l), theme (alias -t)'));
      break;
    }
    case '': {
      dispatch(addTerminalHistory('> Unknown syntax, please try again (change "category to change" "new value")'));
      dispatch(addTerminalHistory('> Syntax: change "category to change" "new value"'));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown category'));
      dispatch(addTerminalHistory('> Available categories: locale (alias -l), theme (alias -t)'));
    }
  }
};

export { terminalProcessChangeCommand };
