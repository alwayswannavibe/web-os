// Redux
import store from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

// Logic
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
      payload: 'App is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: { type: Apps.Settings },
      type: 'apps/openApp',
    });
  });

  it('should dispatch open settings when input = calculator', () => {
    terminalProcessOpenCommand('calculator');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'App is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: { type: Apps.Calculator },
      type: 'apps/openApp',
    });
  });

  it('should dispatch open settings when input = toDo', () => {
    terminalProcessOpenCommand('toDo');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'App is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: { type: Apps.ToDo },
      type: 'apps/openApp',
    });
  });

  it('should dispatch open settings when input = chat', () => {
    terminalProcessOpenCommand('chat');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'App is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: { type: Apps.Chat },
      type: 'apps/openApp',
    });
  });

  it('should dispatch open settings when input = simon', () => {
    terminalProcessOpenCommand('simon');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'App is open',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: { type: Apps.Simon },
      type: 'apps/openApp',
    });
  });

  it('should dispatch help string when input = help', () => {
    terminalProcessOpenCommand('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: 'Available apps: calculator, toDo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch help string when input = -h', () => {
    terminalProcessOpenCommand('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'This command opens app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: 'Available apps: calculator, toDo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch syntax help when input empty', () => {
    terminalProcessOpenCommand('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'Wrong command, please try again',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: 'Syntax: open "name of app"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('should dispatch unknown string when input uncorrect', () => {
    terminalProcessOpenCommand('dsadasda');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: 'Unknown app',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: 'Available apps: calculator, toDo, settings, chat, simon',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};
