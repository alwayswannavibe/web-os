// React, redux
import store from 'src/redux/store';
import { setLocale } from 'src/redux/slices/localeSlice';
import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';

// Types
import { Locales } from 'src/types/locales';

const terminalProcessChangeLocale = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'ru': {
      dispatch(addTerminalHistory('> Locale was change'));
      dispatch(setLocale(Locales.Russian));
      break;
    }
    case 'br': {
      dispatch(addTerminalHistory('> Locale was change'));
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
