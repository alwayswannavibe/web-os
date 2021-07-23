import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import { openSettings } from 'src/redux/slices/appsSlicesBus/settingsSlice';
import { openCalculator } from 'src/redux/slices/appsSlicesBus/calculatorSlice';
import { openToDo } from 'src/redux/slices/appsSlicesBus/toDoSlice';
import store from 'src/redux/store';
import { openSimon } from 'src/redux/slices/appsSlicesBus/simonSlice';
import { openChat } from 'src/redux/slices/appsSlicesBus/chatSlice';
import i18n from 'src/i18n/i18next';

const terminalProcessOpenCommand = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'settings': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.settingsOpen')}`));
      dispatch(openSettings());
      break;
    }
    case 'calculator': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.calculatorOpen')}`));
      dispatch(openCalculator());
      break;
    }
    case 'todo': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.toDoOpen')}`));
      dispatch(openToDo());
      break;
    }
    case 'simon': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.simonOpen')}`));
      dispatch(openSimon());
      break;
    }
    case 'chat': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.chatOpen')}`));
      dispatch(openChat());
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
