import store from 'src/redux/store';
import { terminalProcessOpenCommand } from '.';

describe('open terminal module', () => {
  store.dispatch = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should dispatch open settings when input = settings', () => {
    terminalProcessOpenCommand('settings');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Settings are open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'settings/openSettings',
    });
  });

  it('should dispatch open settings when input = calculator', () => {
    terminalProcessOpenCommand('calculator');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Calculator is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'calculator/openCalculator',
    });
  });

  it('should dispatch open settings when input = todo', () => {
    terminalProcessOpenCommand('todo');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> To do is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: undefined,
      type: 'toDo/openToDo',
    });
  });

  it('should dispatch help string when input = help', () => {
    terminalProcessOpenCommand('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch help string when input = -h', () => {
    terminalProcessOpenCommand('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch syntax help when input empty', () => {
    terminalProcessOpenCommand('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Wrong command, please try again',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Syntax: open "name of app"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch unknown string when input uncorrect', () => {
    terminalProcessOpenCommand('dsadasda');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available apps: calculator, todo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};
