import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import store from 'src/redux/store';
import i18n from 'src/i18n/i18next';
import { Apps } from 'src/types/apps';
import { openApp } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

const terminalProcessOpenCommand = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'settings': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.settingsOpen')}`));
      dispatch(openApp({ type: Apps.Settings }));
      break;
    }
    case 'calculator': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.calculatorOpen')}`));
      dispatch(openApp({ type: Apps.Calculator }));
      break;
    }
    case 'todo': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.toDoOpen')}`));
      dispatch(openApp({ type: Apps.ToDo }));
      break;
    }
    case 'simon': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.simonOpen')}`));
      dispatch(openApp({ type: Apps.Simon }));
      break;
    }
    case 'chat': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.chatOpen')}`));
      dispatch(openApp({ type: Apps.Chat }));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.openHelpInfo')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableApps')}: calculator, todo, settings, chat, simon`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.wrongCommand')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.openExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.unknownApp')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableApps')}: calculator, todo, settings, chat, simon`));
    }
  }
};

export { terminalProcessOpenCommand };
