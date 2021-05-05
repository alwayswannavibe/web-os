import store from 'redux/store';
import { setLocale } from 'redux/slices/localeSlice';
import { Locales } from 'types/locales';
import { addTerminalHistory } from 'redux/slices/terminalSlice';

const terminalProcessChangeLocale = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'ru': {
      dispatch(setLocale(Locales.Russian));
      break;
    }
    case 'br': {
      dispatch(setLocale(Locales.Britain));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory('> This command changes locale'));
      dispatch(addTerminalHistory('> Available locales: ru, br'));
      break;
    }
    case '': {
      dispatch(addTerminalHistory('> Unknown syntax, please try again'));
      dispatch(addTerminalHistory('> Syntax: change "category to change" "new value"'));
      break;
    }
    default: {
      dispatch(addTerminalHistory('> Unknown locale'));
      dispatch(addTerminalHistory('> Available locales: ru, br'));
    }
  }
};

export { terminalProcessChangeLocale };
