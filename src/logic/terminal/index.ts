import { addTerminalHistory, clearTerminalHistory } from 'redux/slices/terminalSlice';
import { clearToDo } from 'redux/slices/toDoSlice';
import store from 'redux/store';
import { terminalProcessOpenCommand } from './open';
import { terminalProcessChangeCommand } from './change';

const { dispatch } = store;

const processTerminalInput = (input: string) => {
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
    case 'todo clear': {
      dispatch(clearToDo());
      dispatch(addTerminalHistory('> todo list cleared'));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown command'));
      dispatch(addTerminalHistory('> Type "help" to view commands'));
    }
  }
};

export { processTerminalInput };
