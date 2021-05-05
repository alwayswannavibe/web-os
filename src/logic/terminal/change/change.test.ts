import store from 'redux/store';
import * as terminalProcessChangeTheme from './theme/index';
import * as terminalProcessChangeLocale from './locale/index';
import { terminalProcessChangeCommand } from '.';

describe('change terminal module', () => {
  store.dispatch = jest.fn();
  const mockTerminalProcessChangeTheme = jest.spyOn(terminalProcessChangeTheme, 'terminalProcessChangeTheme');
  const mockTerminalProcessChangeLocale = jest.spyOn(terminalProcessChangeLocale, 'terminalProcessChangeLocale');

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls terminalProcessChangeTheme then input = theme', () => {
    terminalProcessChangeCommand('theme');
    expect(mockTerminalProcessChangeTheme).toBeCalledTimes(1);
    expect(mockTerminalProcessChangeTheme).toHaveBeenNthCalledWith(1, '');
  });

  it('calls terminalProcessChangeTheme then input = -t', () => {
    terminalProcessChangeCommand('-t');
    expect(mockTerminalProcessChangeTheme).toBeCalledTimes(1);
    expect(mockTerminalProcessChangeTheme).toHaveBeenNthCalledWith(1, '');
  });

  it('calls terminalProcessChangeTheme with correct args then input = theme sea', () => {
    terminalProcessChangeCommand('theme sea');
    expect(mockTerminalProcessChangeTheme).toBeCalledTimes(1);
    expect(mockTerminalProcessChangeTheme).toHaveBeenNthCalledWith(1, 'sea');
  });

  it('calls terminalProcessChangeLocale then input = locale', () => {
    terminalProcessChangeCommand('locale');
    expect(mockTerminalProcessChangeLocale).toBeCalledTimes(1);
    expect(mockTerminalProcessChangeLocale).toHaveBeenNthCalledWith(1, '');
  });

  it('calls terminalProcessChangeLocale then input = -l', () => {
    terminalProcessChangeCommand('-l');
    expect(mockTerminalProcessChangeLocale).toBeCalledTimes(1);
    expect(mockTerminalProcessChangeLocale).toHaveBeenNthCalledWith(1, '');
  });

  it('dispatch help string then input = help', () => {
    terminalProcessChangeCommand('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes value of category',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available categories: locale (alias -l), theme (alias -t)',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch help string then input = -h', () => {
    terminalProcessChangeCommand('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes value of category',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available categories: locale (alias -l), theme (alias -t)',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch syntax string then input empty', () => {
    terminalProcessChangeCommand('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown syntax, please try again (change "category to change" "new value")',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Syntax: change "category to change" "new value"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch unknown string then input uncorrect', () => {
    terminalProcessChangeCommand('dasdasdas');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown category',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available categories: locale (alias -l), theme (alias -t)',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};
