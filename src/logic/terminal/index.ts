import { addTerminalHistory, clearTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import store from 'src/redux/store';
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
      dispatch(addTerminalHistory('> Available commands: open, clear, change'));
      break;
    }
    case 'change': {
      terminalProcessChangeCommand(input.split(' ').slice(1).join(' '));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown command'));
      dispatch(addTerminalHistory('> Type "help" to view commands'));
    }
  }
};

export { processTerminalInput };
