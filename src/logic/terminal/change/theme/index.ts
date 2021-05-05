import store from 'redux/store';
import { addTerminalHistory } from 'redux/slices/terminalSlice';
import { setTheme } from 'redux/slices/themeSlice';
import { Themes } from 'types/themes';

const terminalProcessChangeTheme = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'planet': {
      dispatch(setTheme(Themes.Planet));
      break;
    }
    case 'sea': {
      dispatch(setTheme(Themes.Sea));
      break;
    }
    case 'car': {
      dispatch(setTheme(Themes.Car));
      break;
    }
    case 'tree': {
      dispatch(setTheme(Themes.Tree));
      break;
    }
    case 'road': {
      dispatch(setTheme(Themes.Road));
      break;
    }
    case 'dynamic': {
      dispatch(setTheme(Themes.Dynamic));
      break;
    }
    case 'dynamic2': {
      dispatch(setTheme(Themes.Dynamic2));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory('> This command changes theme'));
      dispatch(addTerminalHistory('> Available themes: planet, sea, tree, road, car, dynamic, dynamic2'));
      break;
    }
    case '': {
      dispatch(addTerminalHistory('> Unknown syntax, please try again'));
      dispatch(addTerminalHistory('> Syntax: change "category to change" "new value"'));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown theme'));
      dispatch(addTerminalHistory('> Available themes: planet, sea, tree, road, car, dynamic, dynamic2'));
    }
  }
};

export { terminalProcessChangeTheme };
