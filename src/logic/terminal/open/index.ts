import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import store from 'src/redux/store';
import i18n from 'src/i18n/i18next';
import { Apps } from 'src/types/apps';
import { openApp } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

const terminalProcessOpenCommand = (input: string) => {
  const { dispatch } = store;

  const firstWord = input.split(' ')[0];
  const arr = firstWord.split('');
  if (arr[0]) {
    arr[0] = arr[0].toUpperCase();
  }
  const app = arr.join('');

  if (Object.values(Apps).includes(app as Apps)) {
    dispatch(addTerminalHistory(`> ${i18n.t('terminal.appOpen')}`));
    dispatch(openApp({ type: app as Apps }));
    return;
  }

  switch (firstWord) {
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.openHelpInfo')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableApps')}: calculator, toDo, settings, chat, simon`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.wrongCommand')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.openExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.unknownApp')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableApps')}: calculator, toDo, settings, chat, simon`));
    }
  }
};

export { terminalProcessOpenCommand };
