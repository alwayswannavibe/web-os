import { addTerminalHistory } from 'redux/slices/terminalSlice';
import { openSettings } from 'redux/slices/settingsSlice';
import { openCalculator } from 'redux/slices/calculatorSlice';
import { openToDo } from 'redux/slices/toDoSlice';
import store from 'redux/store';

const terminalProcessOpenCommand = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'settings': {
      dispatch(addTerminalHistory('> Settings opened'));
      dispatch(openSettings());
      break;
    }
    case 'calculator': {
      dispatch(addTerminalHistory('> Calculator opened'));
      dispatch(openCalculator());
      break;
    }
    case 'todo': {
      dispatch(addTerminalHistory('> ToDo opened'));
      dispatch(openToDo());
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory('> This command opens app'));
      dispatch(addTerminalHistory('> Available apps: calculator, todo, settings'));
      break;
    }
    case '': {
      dispatch(addTerminalHistory('> Unknown syntax, please try again (open "name of app")'));
      dispatch(addTerminalHistory('> Syntax: open "name of app"'));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown app'));
      dispatch(addTerminalHistory('> Available apps: calculator, todo, settings'));
    }
  }
};

export { terminalProcessOpenCommand };
