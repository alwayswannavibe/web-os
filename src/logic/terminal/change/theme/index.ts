// React, redux
import store from 'src/redux/store';
import { addTerminalHistory } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import { setTheme } from 'src/redux/slices/themeSlice';
import i18n from 'src/i18n/i18next';

// Types
import { Themes } from 'src/types/themes';

const terminalProcessChangeTheme = (input: string) => {
  const { dispatch } = store;

  switch (input.split(' ')[0]) {
    case 'planet': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Planet));
      break;
    }
    case 'sea': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Sea));
      break;
    }
    case 'car': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Car));
      break;
    }
    case 'tree': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Tree));
      break;
    }
    case 'road': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Road));
      break;
    }
    case 'dynamic': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Dynamic));
      break;
    }
    case 'dynamic2': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.themeChange')}`));
      dispatch(setTheme(Themes.Dynamic2));
      break;
    }
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.changeThemeHelpInfo')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableThemes')}: planet, sea, tree, road, car, dynamic, dynamic2`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.wrongCommand')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.changeExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.unknownTheme')}`));
      dispatch(addTerminalHistory(`> ${i18n.t('terminal.availableThemes')}: planet, sea, tree, road, car, dynamic, dynamic2`));
    }
  }
};

export { terminalProcessChangeTheme };
