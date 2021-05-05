import store from 'redux/store';
import * as terminalProcessOpenCommand from 'logic/terminal/open';
import * as terminalProcessChangeCommand from 'logic/terminal/change';
import { processTerminalInput } from '.';

describe('main terminal module', () => {
  store.dispatch = jest.fn();
  const terminalProcessOpenCommandMock = jest.spyOn(terminalProcessOpenCommand, 'terminalProcessOpenCommand');
  const terminalProcessChangeCommandMock = jest.spyOn(terminalProcessChangeCommand, 'terminalProcessChangeCommand');

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('dispatch unknown command if input empty', () => {
    processTerminalInput('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown command',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Type "help" to view commands',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch unknown command if input uncorrect', () => {
    processTerminalInput('dasdas');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown command',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Type "help" to view commands',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('clear terminal history when input = clear', () => {
    processTerminalInput('clear');
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: undefined,
      type: 'terminal/clearTerminalHistory',
    });
  });

  it('dispatch help string when input = help', () => {
    processTerminalInput('help');
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Available commands: open, clear, change',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('calls terminalProcessOpenCommand when input = open', () => {
    processTerminalInput('open');
    expect(store.dispatch).toBeCalledTimes(0);
    expect(terminalProcessOpenCommandMock).toBeCalledTimes(1);
    expect(terminalProcessOpenCommandMock).toHaveBeenNthCalledWith(1, '');
  });

  it('calls terminalProcessOpenCommand with correct args when input = open calculator', () => {
    processTerminalInput('open calculator');
    expect(store.dispatch).toBeCalledTimes(0);
    expect(terminalProcessOpenCommandMock).toBeCalledTimes(1);
    expect(terminalProcessOpenCommandMock).toHaveBeenNthCalledWith(1, 'calculator');
  });

  it('calls terminalProcessChangeCommand when input = change', () => {
    processTerminalInput('change');
    expect(store.dispatch).toBeCalledTimes(0);
    expect(terminalProcessChangeCommandMock).toBeCalledTimes(1);
    expect(terminalProcessChangeCommandMock).toHaveBeenNthCalledWith(1, '');
  });
});

export {};
