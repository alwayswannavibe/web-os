// Redux
import store from 'src/redux/store';
import { addTerminalHistory } from 'src/apps/Terminal/redux';
import { setBackgroundImage } from 'src/features/theme/redux';

// I18n
import i18n from 'src/features/i18n';

// Types
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

// Utils
import { capitalizeFirstLatter } from 'src/utils/capitalizeFirstLatter';

const terminalProcessChangeTheme = (input: string) => {
  const { dispatch } = store;

  const newBackgroundImage = capitalizeFirstLatter(input.trim());

  if (store.getState().theme.backgroundImages.includes(newBackgroundImage as BackgroundImage)) {
    dispatch(addTerminalHistory(`${i18n.t('terminal:themeChange')}`));
    dispatch(setBackgroundImage({ backgroundImage: newBackgroundImage as BackgroundImage }));
    return;
  }

  switch (input.trim()) {
    case 'help':
    case '-h': {
      dispatch(addTerminalHistory(`${i18n.t('terminal:changeThemeHelpInfo')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:availableThemes')}: planet, sea, tree, road, car, dynamic, dynamic2`));
      break;
    }
    case '': {
      dispatch(addTerminalHistory(`${i18n.t('terminal:wrongCommand')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:changeExample')}`));
      break;
    }
    default: {
      dispatch(addTerminalHistory(`${i18n.t('terminal:unknownTheme')}`));
      dispatch(addTerminalHistory(`${i18n.t('terminal:availableThemes')}: planet, sea, tree, road, car, dynamic, dynamic2`));
    }
  }
};

export { terminalProcessChangeTheme };
