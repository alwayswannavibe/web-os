// Types
import { Themes } from 'src/types/themes';

// Redux
import store from 'src/redux/store';

// Logic
import { terminalProcessChangeTheme } from '.';

describe('change theme terminal module', () => {
  store.dispatch = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('dispatch change theme then input = planet', () => {
    terminalProcessChangeTheme('planet');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Planet,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = sea', () => {
    terminalProcessChangeTheme('sea');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Sea,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = road', () => {
    terminalProcessChangeTheme('road');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Road,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = car', () => {
    terminalProcessChangeTheme('car');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Car,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = tree', () => {
    terminalProcessChangeTheme('tree');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Tree,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = dynamic', () => {
    terminalProcessChangeTheme('dynamic');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Dynamic,
      type: 'theme/setTheme',
    });
  });

  it('dispatch change theme then input = dynamic2', () => {
    terminalProcessChangeTheme('dynamic2');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Theme is change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Themes.Dynamic2,
      type: 'theme/setTheme',
    });
  });

  it('dispatch help string then input = help', () => {
    terminalProcessChangeTheme('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes theme',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available themes: planet, sea, tree, road, car, dynamic, dynamic2',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch help string then input = -h', () => {
    terminalProcessChangeTheme('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes theme',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available themes: planet, sea, tree, road, car, dynamic, dynamic2',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch syntax string then input empty', () => {
    terminalProcessChangeTheme('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Wrong command, please try again',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Syntax: change "category to change" "new value"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch unknown string then input uncorrect', () => {
    terminalProcessChangeTheme('dasdasdas');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown theme',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available themes: planet, sea, tree, road, car, dynamic, dynamic2',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};
