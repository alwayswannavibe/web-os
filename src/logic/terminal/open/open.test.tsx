import store from 'redux/store';
import { terminalProcessOpenCommand } from '.';

describe('open terminal module', () => {
  store.dispatch = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('dispatch open settings when input = settings', () => {
    terminalProcessOpenCommand('settings');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Settings opened',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'settings/openSettings',
    });
  });

  it('dispatch open settings when input = calculator', () => {
    terminalProcessOpenCommand('calculator');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Calculator opened',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'calculator/openCalculator',
    });
  });

  it('dispatch open settings when input = todo', () => {
    terminalProcessOpenCommand('todo');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> To do opened',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'toDo/openToDo',
    });
  });

  it('dispatch help string when input = help', () => {
    terminalProcessOpenCommand('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch help string when input = -h', () => {
    terminalProcessOpenCommand('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch syntax help when input empty', () => {
    terminalProcessOpenCommand('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown syntax, please try again (open "name of app")',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Syntax: open "name of app"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch unknown string when input uncorrect', () => {
    terminalProcessOpenCommand('dsadasda');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};
