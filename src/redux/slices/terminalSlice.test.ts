import store from 'redux/store';
import {
  addTerminalHistory,
  changeTerminalCoord,
  changeTerminalIconCoord,
  clearTerminalHistory,
  clearTerminalInputHistory,
  closeTerminal,
  openTerminal,
  toggleCollapseTerminal,
} from './terminalSlice';

describe('terminal slice', () => {
  it('opens then calls openTerminal', () => {
    store.dispatch(openTerminal());
    expect(store.getState().terminal.isTerminalOpen).toEqual(true);
    store.dispatch(closeTerminal());
  });

  it('closes then calls closeTerminal', () => {
    store.dispatch(openTerminal());
    store.dispatch(closeTerminal());
    expect(store.getState().terminal.isTerminalOpen).toEqual(false);
  });

  it('toggles collapse then calls toggleCollapseTerminal', () => {
    store.dispatch(openTerminal());
    store.dispatch(toggleCollapseTerminal());
    expect(store.getState().terminal.isTerminalCollapsed).toEqual(true);
    store.dispatch(toggleCollapseTerminal());
    expect(store.getState().terminal.isTerminalCollapsed).toEqual(false);
    store.dispatch(closeTerminal());
  });

  it('changes coordinates then calls changeTerminalCoord', () => {
    store.dispatch(
      changeTerminalCoord({
        top: '23px',
        left: '250px',
      }),
    );
    expect(store.getState().terminal.terminalLeftCoord).toEqual('250px');
    expect(store.getState().terminal.terminalTopCoord).toEqual('23px');
    store.dispatch(
      changeTerminalCoord({
        top: '13rem',
        left: '1.5rem',
      }),
    );
  });

  it('changes icon coordinates then calls changeTerminalIconCoord', () => {
    store.dispatch(
      changeTerminalIconCoord({
        top: '210px',
        left: '750px',
      }),
    );
    expect(store.getState().terminal.terminalIconLeftCoord).toEqual('750px');
    expect(store.getState().terminal.terminalIconTopCoord).toEqual('210px');
    store.dispatch(
      changeTerminalIconCoord({
        top: '15rem',
        left: '8rem',
      }),
    );
  });

  it('clear terminal history then calls clearTerminalHistory', () => {
    store.dispatch(addTerminalHistory('< first input message'));
    store.dispatch(addTerminalHistory('> first output message'));
    store.dispatch(addTerminalHistory('> second output message'));
    store.dispatch(clearTerminalHistory());
    expect(store.getState().terminal.terminalHistory).toHaveLength(0);
    store.dispatch(clearTerminalInputHistory());
  });

  it('clear terminal input history then calls clearTerminalInputHistory', () => {
    store.dispatch(addTerminalHistory('< first input message'));
    store.dispatch(addTerminalHistory('> first output message'));
    store.dispatch(addTerminalHistory('> second output message'));
    store.dispatch(clearTerminalInputHistory());
    expect(store.getState().terminal.terminalInputHistory).toHaveLength(0);
    store.dispatch(clearTerminalHistory());
  });

  it('add terminal history item then calls addTerminalHistory', () => {
    store.dispatch(addTerminalHistory('< first input message'));
    expect(store.getState().terminal.terminalHistory).toHaveLength(1);
    expect(store.getState().terminal.terminalHistory[0].message).toEqual('< first input message');
    store.dispatch(addTerminalHistory('> first output message'));
    expect(store.getState().terminal.terminalHistory).toHaveLength(2);
    expect(store.getState().terminal.terminalHistory[1].message).toEqual('> first output message');
    store.dispatch(addTerminalHistory('> second output message'));
    expect(store.getState().terminal.terminalHistory).toHaveLength(3);
    expect(store.getState().terminal.terminalHistory[2].message).toEqual('> second output message');
    store.dispatch(clearTerminalHistory());
    store.dispatch(clearTerminalInputHistory());
  });

  it('add inputHistory item then calls addTerminalHistory with input string', () => {
    store.dispatch(addTerminalHistory('< first input message'));
    expect(store.getState().terminal.terminalInputHistory).toHaveLength(1);
    expect(store.getState().terminal.terminalInputHistory[0]).toEqual('first input message');
    store.dispatch(addTerminalHistory('< second input message'));
    expect(store.getState().terminal.terminalInputHistory).toHaveLength(2);
    expect(store.getState().terminal.terminalInputHistory[1]).toEqual('second input message');
    store.dispatch(clearTerminalHistory());
    store.dispatch(clearTerminalInputHistory());
  });
});

export {};
